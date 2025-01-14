import React from "react";

export type FormTypeProp = 'sign-in' | 'sign-up'

export type OTPModalProps = {
    email:string;
    accountId: string;
}

export type OTPFormProps ={
    password:string;
    setPassword:React.Dispatch<React.SetStateAction<string>>
}
export interface NavItemProp{
    name:string;
    icon:string;
    url:string;
    active?:boolean
  }
  export interface SidebarProps{
    fullName:string;
    avatar:string;
    email:string;
  }
  export interface MobileNavigationProps{
    ownerId:string;
    accountId:string;
  }