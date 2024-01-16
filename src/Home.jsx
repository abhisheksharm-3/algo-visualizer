import Visualization from "./components/Visualization";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <Visualization />
    </div>
  );
}

export default Home;
