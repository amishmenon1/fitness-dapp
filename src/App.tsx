import "./App.css";

import LandingPage from "./pages/landing";
import NavBar from "./sections/navbar/navbar";

function App() {
  return (
    <div className="h-[100vh] bg-dumbbellBg bg-cover">
      <NavBar />
      <LandingPage />
    </div>
  );
}

export default App;
