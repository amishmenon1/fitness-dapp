import "./App.css";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";

import LandingPage from "./pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playground from "./pages/playground";

function App() {
  return (
    <div className={`bg-cover bg-dumbbellBg h-screen w-full `}>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthLayout />}>
            {/* <Route index element={<ConnectWalletPage />} /> */}
          </Route>
          <Route path="/" element={<MainLayout className="" />}>
            <Route index element={<LandingPage />} />
            <Route path="/playground" element={<Playground />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
