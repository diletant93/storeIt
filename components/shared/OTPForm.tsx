import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components_shadcn/ui/input-otp"
import { OTPFormProps } from "@/types/props";
export default function OTPForm({password, setPassword}:OTPFormProps) {
    return (
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className="shad-otp">
                <InputOTPSlot index={0} className="shad-otp-slot"/>
                <InputOTPSlot index={1} className="shad-otp-slot"/>
                <InputOTPSlot index={2} className="shad-otp-slot"/>
                <InputOTPSlot index={3} className="shad-otp-slot"/>
                <InputOTPSlot index={4} className="shad-otp-slot"/>
                <InputOTPSlot index={5} className="shad-otp-slot"/>
            </InputOTPGroup>
        </InputOTP>
    );
}
