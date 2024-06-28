export type NavItemType = {
  key: string;
  label: string;
  path: string;
  icon: string;
};
export const mainPaths: NavItemType[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: "",
  },
  // {
  //   key: "playground",
  //   label: "Playground",
  //   path: "/playground",
  //   icon: "",
  // },
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "/settings",
  //   icon: "",
  // },
];

export const otherPaths = [
  // bottom links
  {
    key: "auth-connect",
    label: "Login",
    path: "/login",
    icon: "",
  },
];
