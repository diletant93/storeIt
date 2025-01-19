import React from 'react';

export type FormTypeProp = 'sign-in' | 'sign-up';

export type OTPModalProps = {
  email: string;
  accountId: string;
};

export type OTPFormProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};
export interface NavItemProp {
  name: string;
  icon: string;
  url: string;
  active?: boolean;
}
export interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}
export interface MobileNavigationProps {
  $id: string;
  accountId: string;
}
export type MobileMenuProps = SidebarProps & MobileNavigationProps

export interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

export interface ThumbnailProps {
  type: string;
  extension: string;
  imageClassName?: string;
  className?: string;
  url?: string;
}
export interface FileItemProps {
  file: File;
  onRemoveFile: (
    e: React.MouseEvent<HTMLImageElement>,
    fileName: string,
  ) => void;
}
export interface FileListProps {
  files: File[];
  onRemoveFile: (
    e: React.MouseEvent<HTMLImageElement>,
    fileName: string,
  ) => void;
}

export interface HeaderProps{
  accountId: string;
  ownerId:string;
}
export interface FormattedDateTimeProps{
  date:string;
  className?:string;
}
export type DetailRowProps={
  value:string;
  label:string;
}
export type ShareInputProps={
  file:IFileType;
  onInputChange:(emails:string[])=>void;
  onRemove:(email:string)=>void;
}