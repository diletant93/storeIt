import { Button } from "@/components_shadcn/ui/button";
import Image from "next/image";

export default function SignOutButton({ device = 'desktop' }: { device?: 'mobile' | 'desktop' }) {
    const type = {
        mobile: 'mobile-sign-out-button',
        desktop: 'sign-out-button'
    }
    return (
        <Button type='submit' className={type[device]}>
            <Image src='/assets/icons/logout.svg' alt='logo' width={24} height={24} className="w-6 -translate-x-[1px]" />
            {device === 'mobile' && <span className="ml-2">Sign Out</span>}
        </Button>
    );
}
