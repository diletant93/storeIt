import { Button } from "@/components_shadcn/ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import SignOutButton from "../elements/SignOutButton";
import { signOut } from "@/lib/actions/user.actions";
import { HeaderProps } from "@/types/props";
import UpgradedSearch from "./UpgradedSearch";

export default function Header({accountId, ownerId}:HeaderProps) {
  return (
    <header className="header">
       <UpgradedSearch/>
       <div className="header-wrapper">
            <FileUploader accountId={accountId} ownerId={ownerId}/>
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
