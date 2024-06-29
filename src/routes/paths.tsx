import Login from "@/pages/auth";
import LandingPage from "@/pages/landing";
import Playground from "@/pages/playground";

export type NavItemType = {
  key: string;
  label: string;
  path: string;
  icon: string;
  element?: React.ReactNode;
  index?: boolean;
};
export const mainPaths: NavItemType[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: "",
    index: true,
    element: <LandingPage />,
  },
  {
    key: "playground",
    label: "Playground",
    path: "/playground",
    icon: "",
    element: <Playground />,
  },
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "/settings",
  //   icon: "",
  // },
];

export const authPaths = [
  // bottom links
  {
    key: "login",
    label: "Login",
    path: "",
    icon: "",
    element: <Login />,
  },
];
