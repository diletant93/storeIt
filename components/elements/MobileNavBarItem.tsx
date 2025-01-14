import { cn } from "@/lib/utils";
import { NavItemProp } from "@/types/props";
import Image from "next/image";
import Link from "next/link";

export default function MobileNavBarItem({item}:{item:NavItemProp}) {
    const {url, name , icon ,active} = item
    return (
        <Link href={url} className="lg:w-full">
            <li className={cn('mobile-nav-item', active && 'shad-active')}>
                <Image src={icon} alt={name} width={24} height={24} className={cn('nav-icon',active && 'nav-icon-active')}/>
                <p>{name}</p>
            </li>
        </Link>
    );
}
