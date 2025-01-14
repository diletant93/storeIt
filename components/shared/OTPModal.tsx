"useClient"
import { OTPModalProps } from "@/types/props";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components_shadcn/ui/alert-dialog"
import OTPForm from "./OTPForm";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components_shadcn/ui/button";
import { sendEmailOTP, verifySecretCode } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export default function OTPModal({ email, accountId }: OTPModalProps) {
    const [isOpen,setIsOpen] = useState<boolean>(true)
    const [password,setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    async function handleSubmit(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        setIsLoading(true)
        try {
            const sessionId = await verifySecretCode({accountId,password})
            if(sessionId){
                router.push('/')
            }
        } catch (error) {
            handleError(error, 'failed to verify otp')
        }finally{
            setIsLoading(false)
        }
    }
    async function handleResendOTP(){
        try {
            await sendEmailOTP({email})
        } catch (error) {
            handleError(error, 'Could not sendOTP again')
        }
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader className="relative flex justify-center">
                    <AlertDialogTitle className="h2 text-center">
                        Enter your OTP
                        <Image src='/assets/icons/close-dark.svg' width={20} height={20} onClick={()=>setIsOpen(false)} className="otp-close-button" alt="close"/>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                        We&apos;ve sent a code to <span className="pl-1 text-brand">{email}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                    <OTPForm password={password} setPassword={setPassword}/>
                <AlertDialogFooter>
                    <div className="flex w-full flex-col gap-4">
                        <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12" type="button">
                            Submit
                            {isLoading &&(
                                <Image src='/assets/icons/loader.svg' alt="loader" width={24} height={24}  className="ml-2 animate-spin"/>
                            )}
                        </AlertDialogAction>
                        <div className="subtitle-2 mt-2 text-center text-light-100">
                            Didn't get a code?
                            <Button type='button' variant='link' className='pl-1 text-brand' onClick={handleResendOTP}>Click to resend</Button>
                        </div>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}
