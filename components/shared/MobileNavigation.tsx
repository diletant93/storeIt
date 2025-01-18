import Logo from "../elements/Logo";
import MobileMenu from "../elements/MobileMenu";
import { MobileMenuProps } from "@/types/props";
export default function MobileNavigation({$id:ownerId, accountId,fullName, avatar, email}:MobileMenuProps) {
  return (
    <header className="mobile-header">
     <Logo/>
      <MobileMenu $id={ownerId} accountId={accountId} fullName={fullName} avatar={avatar} email={email} />
    </header>

  );
}
