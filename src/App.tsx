import "./App.css";

import LandingPage from "./pages/landing";
import NavBar from "./sections/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className=" h-screen bg-dumbbellBg bg-cover xs:px-10 sm:px-20 md:px-40">
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
