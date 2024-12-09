import StatKeepingComponent from "@/components/StatKeepingComponent";
import { getTeamByName } from "@/lib/utils";
import Image from "next/image";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ name?: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const firstTeam = decodeURIComponent((await params).name as string);
  const secondTeam = (await searchParams).secondTeam;

  return (
    <div className="mt-4 ml-1">
      <h1 className="flex items-center gap-8 ml-2 text-2xl font-semibold">
        {firstTeam} <span className="text-4xl font-bold">VS</span> {secondTeam}
      </h1>
      <StatKeepingComponent
        firstTeam={firstTeam}
        secondTeam={secondTeam as string}
      />
    </div>
  );
}
