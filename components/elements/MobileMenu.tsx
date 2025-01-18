"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet"
import { MobileMenuProps, SidebarProps } from "@/types/props";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useState } from "react";
import MobileNavBar from "./MobileNavBar";
import SignOutButton from "./SignOutButton";
import FileUploader from "../shared/FileUploader";
export default function MobileMenu({avatar, fullName,email, $id:ownerId, accountId}: MobileMenuProps) {
    const [open,setOpen] = useState<boolean>(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
            <Image src='/assets/icons/menu.svg' alt='search' height={30} width={30}/>
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetHeader>
            <SheetTitle>
                <div className="header-user">
                    <Image src={avatar} alt="avatar" width={44} height={44} className="header-user-avatar"/>
                    <div className="sm:hidden lg:block">
                      <p className="subtitle-2 capitalize text-left">
                         {fullName}
                      </p>
                      <p className="caption">
                        {email}
                      </p>
                    </div>
                </div>
                <Separator className="mb-4 bg-light-200/20 "/>
            </SheetTitle>
          </SheetHeader>
            <MobileNavBar/>
            <Separator className="my-5 bg-light-200/20"/>
            <div className="flex flex-col justify-between pag-5 pb-5">
              <FileUploader ownerId={ownerId} accountId={accountId}/>
              <SignOutButton device='mobile'/>
            </div>
        </SheetContent>
      </Sheet>
  );
}
