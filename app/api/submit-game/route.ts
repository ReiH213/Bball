import { writeClient } from "@/sanity/lib/write-client";
import { Match, Player } from "@/sanity/types";
import { NextResponse } from "next/server";
type SubmitGameRequestBody = {
  firstTeamStats: Player[]; // Replace `any` with the actual type of your Player
  secondTeamStats: Player[]; // Replace `any` with the actual type of your Player
  firstTeamScore: number;
  secondTeamScore: number;
  match: Match;
};
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitGameRequestBody;
    const {
      firstTeamStats,
      secondTeamStats,
      firstTeamScore,
      secondTeamScore,
      match,
    } = body;

    await Promise.all(
      [...firstTeamStats, ...secondTeamStats].map(async (player: any) => {
        const existingPlayer = await writeClient.fetch(
          `*[_type == "player" && _id == $id][0]`,
          { id: player._id }
        );
        const existingMatchDays = existingPlayer?.matchDays || [];

        const currentMatchDay = player.matchDays[0];

        const updatedMatchDays = existingMatchDays.map((day: any) => {
          if (day.match?._ref === match._id) {
            // Update only the current matchDay stats by merging them

            return {
              ...day,
              fieldGoals: {
                points_1: [...(currentMatchDay.fieldGoals?.points_1 || [])],
                points_2: [...(currentMatchDay.fieldGoals?.points_2 || [])],
                points_3: [...(currentMatchDay.fieldGoals?.points_3 || [])],
              },
              oRebounds: [...(currentMatchDay.oRebounds || [])],
              dRebounds: [...(currentMatchDay.dRebounds || [])],
              steals: [...(currentMatchDay.steals || [])],
              blocks: [...(currentMatchDay.blocks || [])],
              fouls: [...(currentMatchDay.fouls || [])],
              missedShots: [...(currentMatchDay.missedShots || [])],
              assists: [...(currentMatchDay.assists || [])],
            };
          }
          return day; // Keep other matchDays unchanged
        });

        const isMatchDayExists = existingMatchDays.some(
          (day: any) => day.match?._ref === player.matchDays[0].match?._ref
        );
        if (!isMatchDayExists) {
          updatedMatchDays.push(currentMatchDay);
        }

        await writeClient
          .patch(player._id)
          .set({ matchDays: updatedMatchDays })
          .commit();
      })
    );

    // Update the match document
    let won = "";
    if (firstTeamScore > secondTeamScore) {
      won = match.firstTeam as string;
    } else if (firstTeamScore < secondTeamScore) {
      won = match.secondTeam as string;
    } else {
      won = "Draw";
    }
    await writeClient
      .patch(match._id)
      .set({
        score: {
          firstTeamScore,
          secondTeamScore,
        },
        winner: won,
      })
      .commit();
    return NextResponse.json({
      success: true,
      message: "Game submitted successfully!",
    });
  } catch (error) {
    console.error("Error in submit-game route:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit the game." },
      { status: 500 }
    );
  }
}
