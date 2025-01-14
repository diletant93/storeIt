import { cn } from "@/lib/utils";
import { NavItemProp } from "@/types/props";
import Image from "next/image";
import Link from "next/link";

export default function NavbarItem({item} : {item:NavItemProp}) {
    const {url, name , icon ,active} = item
    return (
        <Link href={url} className="lg:w-full">
            <li className={cn('sidebar-nav-item', active && 'shad-active')}>
                <Image src={icon} alt={name} width={24} height={24} className={cn('nav-icon',active && 'nav-icon-active')}/>
                <p className="hidden lg:block">{name}</p>
            </li>
        </Link>
    );
}
