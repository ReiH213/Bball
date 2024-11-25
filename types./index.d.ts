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
