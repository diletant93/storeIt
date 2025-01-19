"use client"
import { Button } from "@/components_shadcn/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components_shadcn/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components_shadcn/ui/dropdown-menu"
import { Input } from "@/components_shadcn/ui/input";
import { actionsDropdownItems } from "@/constants";
import useActionDropDown, { INITIAL_STATE } from "@/hooks/useActionDropDown";
import { constructDownloadUrl } from "@/lib/utils";
import { ActionType, IFileType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function ActionDropDown({ file }: { file: IFileType }) {
    const { state, dispatch } = useActionDropDown({ ...INITIAL_STATE, name: file.name })
    function handleAction(action: ActionType) {
        dispatch({ type: 'SET_ACTION', payload: action })
        const actions = ['rename', 'share', 'delete', 'details']
        if (actions.includes(action.value)) {
            dispatch({ type: 'SET_IS_MODAL_OPEN', payload: true })
        }
    }
    function handleCloseAllModals(){
        dispatch({type:'SET_TO_INITIAL_STATE', payload: {...INITIAL_STATE,name:file.name}})
    }
    async function handleActions(){

    }
    function renderDialogContent() {
        if (!state.action) return null
        const { value, label } = state.action
        const renameDeleteShare = ['rename', 'delete', 'share']
        return (
            <DialogContent className="shad-dialog button">
                <DialogHeader className="flex flex-col gap-3">
                    <DialogTitle className="text-center text-light-100">{label}</DialogTitle>
                    {value === 'rename' && (
                        <Input type="text" value={state.name} onChange={(e) => { dispatch({ type: 'SET_NAME', payload: e.target.value }) }} />
                    )}
                </DialogHeader>
                {renameDeleteShare.includes(value) && (
                    <DialogFooter className="flex flex-col gap-3 md:flex-row">
                        <Button type="button" onClick={handleCloseAllModals}>Cancel</Button>
                        <Button type="button">
                            <p className="capitalize">{value}</p>
                            {state.isLoading && (
                                <Image src="/assests/icons/loader.svg" alt="laoder" width={24} height={24} className="animate-spin" />
                            )}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        )
    }
    return (
        <Dialog open={state.isModalOpen} onOpenChange={(open: boolean) => { dispatch({ type: 'SET_IS_MODAL_OPEN', payload: open }) }}>
            <DropdownMenu open={state.isDropDownOpen} onOpenChange={(open: boolean) => { dispatch({ type: 'SET_IS_DROP_DOWN_OPEN', payload: open }) }}>
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
            {renderDialogContent()}
        </Dialog>
    );
}
