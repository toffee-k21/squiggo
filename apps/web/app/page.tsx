import CreateRoom from "./components/Input";
import Navbar from "./components/Navbar";

export default function Home() {

  return (
    <div>
      <Navbar />
      <div className="px-7 md:px-[10%] my-44 ">
        <CreateRoom />
      </div>
    </div>
  );
}
