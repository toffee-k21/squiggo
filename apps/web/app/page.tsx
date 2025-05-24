import InputBox from "./components/Input";
import Navbar from "./components/Navbar";

export default function Home() {

  return (
    <div className="px-7 md:px-[10%] my-44 ">
      <Navbar />
      <InputBox />
    </div>
  );
}
