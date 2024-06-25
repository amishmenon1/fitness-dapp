import "./App.css";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";

import LandingPage from "./pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={`bg-dumbbellBg bg-cover`}>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthLayout />}>
            {/* <Route index element={<ConnectWalletPage />} /> */}
          </Route>
          <Route path="/" element={<MainLayout className="" />}>
            <Route index element={<LandingPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
