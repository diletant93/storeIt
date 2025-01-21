"useClient"
import { FormTypeProp, OTPModalProps } from "@/types/props";
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
import { useEffect, useState } from "react";
import { handleError } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components_shadcn/ui/button";
import { cleanUser, sendEmailOTP, verifySecretCode } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export default function OTPModal({ email, accountId, setAccountIdNone,type }: OTPModalProps & {setAccountIdNone:()=>void, type:FormTypeProp}) {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        console.log({email,accountId})
        try {
            const sessionId = await verifySecretCode({ accountId, password })
            if (sessionId) {
                router.push('/')
            }
            else {
                setError('The key is not valid. Try again')
            }
        } catch (error) {
            handleError(error, 'failed to verify otp')
        } finally {
            setIsLoading(false)
        }
    }
    async function handleResendOTP() {
        try {
            await sendEmailOTP({ email })
        } catch (error) {
            handleError(error, 'Could not sendOTP again')
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            setError('')
        },
        3000)
    },[error])
    async function handleClose(){
        setIsOpen(false)
        setPassword('')
        setIsLoading(false)
        setError('')
        setAccountIdNone()
        if(type === 'sign-up'){ 
            console.log('inside handleClose and sign up')
            const response = await cleanUser({email})
            console.log('response:',response)
            console.log('inside handleClose and sign up2')
            if(response){
                setError(response.error)
            }
            console.log('inside handleClose and sign up3')
        }
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader className="relative flex justify-center">
                    <AlertDialogTitle className="h2 text-center">
                        Enter your OTP
                        <Image src='/assets/icons/close-dark.svg' width={20} height={20} onClick={handleClose} className="otp-close-button" alt="close" />
                    </AlertDialogTitle>
                    <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                        We&apos;ve sent a code to <span className="pl-1 text-brand">{email}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <OTPForm password={password} setPassword={setPassword} />
                <AlertDialogFooter>
                    <div className="flex w-full flex-col gap-4">
                        {error && (
                            <p className="error-message">*{error}</p>
                        )}
                        <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12" type="button">
                            Submit
                            {isLoading && (
                                <Image src='/assets/icons/loader.svg' alt="loader" width={24} height={24} className="ml-2 animate-spin" />
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
