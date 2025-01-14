import { Button } from "@/components_shadcn/ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";

export default function Header() {
  return (
    <header className="header">
       <Search/>
       <div className="header-wrapper">
            <FileUploader/>
            <form>
                <Button type='submit' className="sign-out-button">
                    <Image src='/assets/icons/logout.svg' alt='logo' width={24} height={24} className="w-6 -translate-x-[1px]"/>
                </Button>
            </form>
       </div>
    </header>
  );
}
