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
  points: number;
  point_3: number;
  fouls: number;
  oRebounds: number;
  dRebounds: number;
  steals: number;
  blocks: number;
  missedShots: number;
};
