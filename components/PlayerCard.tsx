import { playerIMgs } from "@/constants";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Player } from "@/sanity/types";
import {
  calculateFieldGoalPercentage,
  calculateTotalAssists,
  calculateTotalBlocks,
  calculateTotalDRebounds,
  calculateTotalFouls,
  calculateTotalMissedShots,
  calculateTotalORebounds,
  calculateTotalPoints,
  calculateTotalSteals,
} from "@/lib/utils";
import { fetchMatchFromSanityByRef } from "@/sanity/lib/queries";
const PlayerCard = ({ name, player }: { name?: string; player: Player }) => {
  const playerFromImage = playerIMgs.find((p) => p.name === name);

  const fetchMatchName = async (matchRef: string) => {
    // Return cached name if available

    try {
      const matchName = await fetchMatchFromSanityByRef(matchRef);
      if (matchName) {
        return (
          <h1 className="flex flex-row min-w-fit items-center gap-x-3">
            <span className=" font-semibold">{matchName[0].firstTeam}</span> VS{" "}
            <span className=" font-semibold">{matchName[0].secondTeam}</span>
          </h1>
        );
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const renderPlayerStats = (player: Player) => {
    if (!player || !player.matchDays) return null;
    const totalStats = {
      totalPoints: 0,
      totaloRebounds: 0,
      totaldRebounds: 0,
      totalSteals: 0,
      totalAssists: 0,
      totalBlocks: 0,
      totalFouls: 0,
      totalMissedShots: 0,
      fgPercentage: 0,
    };
    player.matchDays.forEach((matchDay) => {
      totalStats.totalPoints += calculateTotalPoints({
        ...player,
        matchDays: [matchDay],
      });
      totalStats.totaloRebounds += calculateTotalORebounds({
        ...player,
        matchDays: [matchDay],
      });
      totalStats.totaldRebounds += calculateTotalDRebounds({
        ...player,
        matchDays: [matchDay],
      });
      totalStats.totalSteals += calculateTotalSteals({
        ...player,
        matchDays: [matchDay],
      });
      totalStats.totalAssists += calculateTotalAssists({
        ...player,
        matchDays: [matchDay],
      });
      totalStats.totalBlocks += calculateTotalBlocks({
        ...player,
        matchDays: [matchDay],
      });
      totalStats.totalFouls += calculateTotalFouls({
        ...player,
        matchDays: [matchDay],
      });
      totalStats.totalMissedShots += calculateTotalMissedShots({
        ...player,
        matchDays: [matchDay],
      });
    });
    totalStats.fgPercentage = calculateFieldGoalPercentage(player) || 0;
    return (
      <Table className="w-full">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Match</TableHead>
            <TableHead className="w-[100px]">Total Points</TableHead>
            <TableHead className="text-right">Offensive Rebounds</TableHead>
            <TableHead className="text-right">Defensive Rebounds</TableHead>
            <TableHead className="text-right">Total Rebounds</TableHead>
            <TableHead className="text-right">Steals</TableHead>
            <TableHead className="text-right">Assists</TableHead>
            <TableHead className="text-right">Blocks</TableHead>
            <TableHead className="text-right">Fouls</TableHead>
            <TableHead className="text-right">Missed Shots</TableHead>
            <TableHead className="text-right">Field Goal Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {player.matchDays.map((matchDay, index) => (
            <TableRow key={matchDay._key || index}>
              <TableCell>
                {" "}
                {matchDay.match?._ref
                  ? fetchMatchName(matchDay.match._ref) || "Loading..."
                  : "No Match"}
              </TableCell>
              <TableCell>
                {calculateTotalPoints({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalORebounds({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalDRebounds({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalDRebounds({ ...player, matchDays: [matchDay] }) +
                  calculateTotalORebounds({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalSteals({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalAssists({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalBlocks({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalFouls({ ...player, matchDays: [matchDay] })}
              </TableCell>
              <TableCell className="text-right">
                {calculateTotalMissedShots({
                  ...player,
                  matchDays: [matchDay],
                })}
              </TableCell>
              <TableCell className="text-right">
                {calculateFieldGoalPercentage({
                  ...player,
                  matchDays: [matchDay],
                })}{" "}
                %
              </TableCell>
            </TableRow>
          ))}
          {/* Totals Row */}
          <TableRow className="font-bold">
            <TableCell className="text-center text-lg">Totals</TableCell>
            <TableCell className="text-left">
              {totalStats.totalPoints}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totaloRebounds}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totaldRebounds}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totaloRebounds + totalStats.totaldRebounds}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totalSteals}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totalAssists}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totalBlocks}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totalFouls}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.totalMissedShots}
            </TableCell>
            <TableCell className="text-right">
              {totalStats.fgPercentage} %
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-[#633d2b] min-w-[240px] gap-y-4 flex flex-col text-white p-2 items-start justify-start shadow-lg   rounded-lg overflow-hidden transform transition-transform  hover:bg-[#9b6347] hover:scale-105 hover:shadow-2xl max-h-44 hover:cursor-pointer">
        <h2 className="text-lg font-semibold">{name}</h2>
        <div className="flex flex-row gap-x-2">
          {playerFromImage?.img && (
            <Image
              src={playerFromImage.img}
              alt="Player Profile"
              width={100}
              height={100}
            />
          )}
          <div className="flex flex-col">
            <h1 className="font-normal flex flex-row gap-x-1">
              Height{" "}
              <span className="font-bold">{playerFromImage?.height}</span>
            </h1>
            <h1 className="font-normal flex flex-row gap-x-1">
              Weight{" "}
              <span className="font-bold">{playerFromImage?.weight}</span>
            </h1>
            <h1 className="font-normal flex flex-row gap-x-1">
              No: <span className="font-bold">{playerFromImage?.jersey}</span>
            </h1>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-[1200px]"
        style={{
          width: "90vw", // Ensures the dialog uses 90% of the viewport width
          maxWidth: "1200px", // Prevents it from becoming too large
        }}
      >
        <DialogHeader>
          <DialogTitle>{player?.name}'s Stats</DialogTitle>
        </DialogHeader>
        {renderPlayerStats(player)}
      </DialogContent>
    </Dialog>
  );
};

export default PlayerCard;
