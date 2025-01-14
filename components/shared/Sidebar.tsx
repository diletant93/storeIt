import Logo from "../elements/Logo";
import Navbar from "../elements/Navbar";
import Image from "next/image";
import SidebarUserInfo from "../elements/SidebarUserInfo";
import { SidebarProps } from "@/types/props";

export default function Sidebar({fullName, avatar, email}:SidebarProps) {
  return (
    <aside className="sidebar">
       <Logo/>
       <Navbar/>
       <Image src='/assets/images/files-2.png' alt="logo" width={506} height={418} className="w-full transition-all hover:-translate-y-2" />
       <SidebarUserInfo fullName={fullName} avatar={avatar} email={email}/>
    </aside>
  );
}
