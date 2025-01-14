import Logo from "../elements/Logo";
import MobileMenu from "../elements/MobileMenu";
import { MobileNavigationProps, SidebarProps } from "@/types/props";
export default function MobileNavigation({ownerId, accountId,fullName, avatar, email}:SidebarProps & MobileNavigationProps) {
  return (
    <header className="mobile-header">
     <Logo/>
      <MobileMenu fullName={fullName} avatar={avatar} email={email} />
    </header>

  );
}
