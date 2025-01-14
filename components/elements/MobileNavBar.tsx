'use client'
import { navItems } from "@/constants";
import MobileNavBarItem from "./MobileNavBarItem";
import { usePathname } from "next/navigation";

export default function MobileNavBar() {
    const pathname = usePathname()
    return (
        <nav className="mobile-nav">
            <ul className="mobile-nav-list">
                {navItems.map(item => {
                    const active = pathname === item.url
                    const navbarItem = {
                        ...item,
                        active
                    }
                    return (
                        <MobileNavBarItem key={item.icon} item={navbarItem} />
                    )
                })}
            </ul>
        </nav>
    );
}
