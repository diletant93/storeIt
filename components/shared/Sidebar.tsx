import Link from "next/link";
import Logo from "../elements/Logo";
import Navbar from "../elements/Navbar";

export default function Sidebar() {
  return (
    <aside className="sidebar">
       <Logo/>
       <Navbar/>
    </aside>
  );
}
