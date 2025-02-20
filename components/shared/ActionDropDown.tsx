"use client"
import { Button } from "@/components_shadcn/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { actionsDropdownItems, EXTENSIONS } from "@/constants";
import useActionDropDown, { INITIAL_STATE } from "@/hooks/useActionDropDown";
import { deleteFile, renameFile, updateFileUsers } from "@/lib/actions/file.actions";
import { constructDownloadUrl } from "@/lib/utils";
import { ActionType, IFileType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FileDetails from "../elements/FileDetails";
import ShareInput from "../elements/ShareInput";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";

export default function ActionDropDown({ file }: { file: IFileType }) {
    function getInitialState() {
        const initialState = {
            ...INITIAL_STATE,
            name: file.name.replace(EXTENSIONS, ''),
        }
        return initialState
    }
    const { state, dispatch } = useActionDropDown(getInitialState())
    const { toastError } = useErrorToast()
    const { toastSuccess} = useSuccessToast()
    const pathname = usePathname()

    function handleAction(action: ActionType) {
        dispatch({ type: 'SET_ACTION', payload: action })
        const actions = ['rename', 'share', 'delete', 'details']
        if (actions.includes(action.value)) {
            dispatch({ type: 'SET_IS_MODAL_OPEN', payload: true })
        }
    }

    function handleCloseAllModals() {
        dispatch({ type: 'SET_TO_INITIAL_STATE', payload: { ...INITIAL_STATE, name: state.name } })
    }
    function handleSuccessAction(){
        handleCloseAllModals()
        toastSuccess({message:'Done'})
    }
    async function handleRemoveUser(email: string) {
        dispatch({ type: 'SET_IS_LOADING', payload: true })
        dispatch({ type: 'REMOVE_EMAIL', payload: email })
        try {
            await updateFileUsers({ fileId: file.$id, emails: state.emails, path: pathname })
        } catch (error) {
            dispatch({ type: 'SET_IS_LOADING', payload: false })
            if (error instanceof Error) {
                return toastError({ message: error.message })
            }
            return toastError({ message: 'Something went wrong' })
        }

        dispatch({ type: 'SET_IS_LOADING', payload: false })
    }
    function handleInputEmail(emails: string[]) {
        dispatch({ type: 'SET_EMAILS', payload: emails })
    }
    async function handleActions() {
        if (!state.action) return
        dispatch({ type: 'SET_IS_LOADING', payload: true })
        let success: unknown;
        const actions = {
            rename: () => renameFile({ fileId: file.$id, name: state.name, extension: file.extension, path: pathname }),
            share: () => updateFileUsers({ fileId: file.$id, emails: state.emails, path: pathname }),
            delete: () => deleteFile({ file: file, path: pathname }),
        }
        try {
            success = await actions[state.action.value as keyof typeof actions]()
        } catch (error) {
            dispatch({ type: 'SET_IS_LOADING', payload: false })
            if (error instanceof Error) {
                return toastError({ message: error.message })
            }
            return toastError({ message: 'Something went wrong' })
        }
        if (success) handleSuccessAction()
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
                    {value === 'details' && <FileDetails file={file} />}
                    {value === 'share' && <ShareInput
                        file={file}
                        onInputChange={handleInputEmail}
                        onRemove={handleRemoveUser} />}
                    {value === 'delete' && (
                        <p className="delete-confirmation">
                            Are you sure you want to delete{' '}
                            <span className="delete-file-name">{file.name}</span>
                        </p>
                    )}
                </DialogHeader>
                {renameDeleteShare.includes(value) && (
                    <DialogFooter className="flex flex-col gap-3 md:flex-row">
                        <Button type="button" onClick={handleCloseAllModals} className="modal-cancel-button">Cancel</Button>
                        <Button type="button" onClick={handleActions} className="modal-submit-button">
                            <p className="capitalize">{value}</p>
                            {state.isLoading && (
                                <Image src="/assets/icons/loader.svg" alt="laoder" width={24} height={24} className="animate-spin" />
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
