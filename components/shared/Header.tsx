import { Button } from "@/components_shadcn/ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import SignOutButton from "../elements/SignOutButton";

export default function Header() {
  return (
    <header className="header">
       <Search/>
       <div className="header-wrapper">
            <FileUploader/>
            <form>
               <SignOutButton/>
            </form>
       </div>
    </header>
  );
}
