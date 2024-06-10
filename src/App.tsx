import "./App.css";

import LandingPage from "./pages/landing";
import NavBar from "./sections/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-[100vh] bg-dumbbellBg bg-cover">
      {/* className="h-[100vh] bg-gray-400 bg-cover" */}

      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
