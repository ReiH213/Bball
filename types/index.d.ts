declare interface SiderbarProps {
  user: User;
}

declare type User = {
  $id: string;
  email: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

declare interface FooterProps {
  type: "mobile" | "desktop";
}

declare type team = {
  coachName: string;
  name: string;
  startingFive: string[];
};

declare type playerImg = {
  name: string;
  img: string;
};

declare type Dot = {
  x: number;
  y: number;
  made: boolean;
};

declare type PlayerDuringGame = {
  name: string;
  fieldGoals: {
    points_2: Array<{
      point: number;
      dot: Dot;
    }>;
    points_3: Array<{
      point: number;
      dot: Dot;
    }>;
    points_1: Array<{
      point: number;
      dot: Dot;
    }>;
  };
  fouls: Array<{
    foul: number;
    dot: Dot;
  }>;
  oRebounds: Array<{
    rebound: number;
    dot: Dot;
  }>;
  dRebounds: Array<{
    rebound: number;
    dot: Dot;
  }>;
  steals: Array<{
    steal: number;
    dot: Dot;
  }>;
  blocks: Array<{
    block: number;
    dot: Dot;
  }>;
  missedShots: Array<{
    missed: number;
    dot: Dot;
  }>;
};

declare type playerPerGame = {
  name: string;
  pointsPerGame: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  blocksPerGame: number;
  stealsPerGame: number;
};

declare type topTeam = {
  team: string;
  wins: number;
};

declare type teamDef = {
  team: string;
  defensiveRating: number;
};

declare type teamPerf = {
  name: string;
  wins: number;
  games: number;
  performance: number[];
};

declare type TeamPerformance = {
  name: string;
  performance: number[];
};
