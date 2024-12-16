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
      [...firstTeamStats, ...secondTeamStats].map((player: any) =>
        writeClient
          .patch(player._id)
          .set({ matchDays: player.matchDays }) // Update the entire matchDays array
          .commit()
      )
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
