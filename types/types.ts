export interface createAccountType {
  fullName: string;
  email: string;
}
export interface ModalType {
  openName: string;
  setOpenName: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
}
export interface OpenModalType{
    openName:string;
    children: React.ReactElement<{onClick?:()=>void}>
}
export interface WindowModalType{
    name:string;
    children:React.ReactNode;
}
export interface SecretCodeType{
  accountId:string;
  password:string;
}

