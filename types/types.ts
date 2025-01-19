import { Models } from 'node-appwrite';

export interface createAccountType {
  fullName: string;
  email: string;
}
export interface ModalType {
  openName: string;
  setOpenName: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
}
export interface OpenModalType {
  openName: string;
  children: React.ReactElement<{ onClick?: () => void }>;
}
export interface WindowModalType {
  name: string;
  children: React.ReactNode;
}
export interface SecretCodeType {
  accountId: string;
  password: string;
}

export interface UploadFileType {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}
export type IUserType = Models.Document & {
  fullName: string;
  email: string;
  avatar: string;
  accountId: string;
  files: string[];
};

export type IFileType = Models.Document & {
  name: string;
  url: string;
  type: string;
  storageFileId: string;
  accountId: string;
  owner: string;
  extension: string;
  size: number;
  users: string[];
};
