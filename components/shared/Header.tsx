import { Button } from "@/components_shadcn/ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import SignOutButton from "../elements/SignOutButton";
import { signOut } from "@/lib/actions/user.actions";

export default function Header() {
  return (
    <header className="header">
       <Search/>
       <div className="header-wrapper">
            <FileUploader/>
            <form action={async() =>{
              "use server"
              await signOut()
            }}>
               <SignOutButton/>
            </form>
       </div>
    </header>
  );
}
