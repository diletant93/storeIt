"use client"
import {
    Dialog,
} from "@/components_shadcn/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components_shadcn/ui/dropdown-menu"
import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import { ActionType, IFileType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ActionDropDown({ file }: { file: IFileType }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
    const [action, setAction] = useState<ActionType | null>(null)
    function handleAction(action: ActionType) {
        setAction(action)
        const actions = ['name', 'share', 'delete', 'details']
        if (actions.includes(action.value)) {
            setIsModalOpen(true)
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
                <DropdownMenuTrigger className="shad-no-focus">
                    <Image src='/assets/icons/dots.svg' alt="dots" width={34} height={34}></Image>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                    <DropdownMenuLabel className="max-w-[13rem] truncate">
                        {file.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actionsDropdownItems.map(item => (
                        <DropdownMenuItem key={item.value} className="shad-dropdown-item" onClick={(e) => handleAction(item)}>
                            {item.value === 'download' ? (
                                <Link
                                    href={constructDownloadUrl(file.storageFileId)}
                                    download={file.name}
                                    className="flex items-center gap-2">
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        height={30}
                                        width={30} />
                                    {item.label}
                                </Link>
                            ) : (
                                <div
                                    className="flex items-center gap-2">
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        height={30}
                                        width={30} />
                                    {item.label}
                                </div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
}
