import "./App.css";
import NavBar from "./components/navbar";
import LandingPage from "./pages/landing";

function App() {
  return (
    <div className="h-[100vh] bg-dumbbellBg bg-cover">
      <NavBar />
      <LandingPage />
    </div>
  );
}

export default App;
