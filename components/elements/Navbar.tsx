"use client"
import { navItems } from "@/constants";
import { NavItemProp } from "@/types/props";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
    const pathname = usePathname()
    return (
        <nav className="sidebar-nav">
            <ul className="flex flex-1 flex-col gap-6">
                {
                    navItems.map(item => {
                        const active = pathname === item.url
                        const navbarItem = {
                            ...item,
                            active
                        }
                        return (
                          <NavbarItem key={item.icon} item={navbarItem}/>
                        )
                    })
                }
            </ul>
        </nav>
    );
}
