import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import { authPaths, NavItemType, mainPaths } from "./paths";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const Router = () => {
  const { isConnected } = useAccount();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!isConnected) navigate("/login");
  }, [isConnected, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<AuthLayout />}>
        {authPaths.map((p: NavItemType, _) => (
          <Route
            key={p.key}
            index={p.index}
            element={p.element}
            path={p.path}
          />
        ))}
      </Route>
      <Route path="/" element={<MainLayout />}>
        {mainPaths.map(
          (p: NavItemType, _) =>
            isConnected && (
              <Route
                key={p.key}
                index={p.index}
                element={p.element}
                path={p.path}
              />
            )
        )}
      </Route>
    </Routes>
  );
};

export default Router;
