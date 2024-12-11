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
  user: User;
  type: "mobile" | "desktop";
}

declare type team = {
  coachName: string;
  name: string;
  startingFive: string[];
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
