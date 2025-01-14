import { AVATAR_PLACEHOLDER_PATH } from "@/constants";
import { SidebarProps } from "@/types/props";
import Image from "next/image";

export default function SidebarUserInfo({fullName, avatar, email}:SidebarProps) {
  return (
    <div className="sidebar-user-info">
        <Image src={avatar} alt='avatar' height={24} width={24}/>
        <div className="hidden lg:block">
            <p className="subtitle-2 capitalize">{fullName}</p>
            <p className="caption">{email}</p>
        </div>
    </div>
  );
}
