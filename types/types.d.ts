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
  owner: IUserType;
  extension: string;
  size: number;
  users: string[];
};
declare interface ActionType {
  label: string;
  icon: string;
  value: string;
}
export interface ActionDropDownStateType {
  isModalOpen: boolean;
  isDropDownOpen: boolean;
  action: ActionType | null;
  name: string;
  isLoading: boolean;
  emails: string[];
}
export type ActionDropDownActions =
  | { type: 'SET_IS_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_IS_DROP_DOWN_OPEN'; payload: boolean }
  | { type: 'SET_ACTION'; payload: ActionType | null }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_TO_INITIAL_STATE'; payload: ActionDropDownStateType }
  | { type: 'SET_EMAILS'; payload: string[] };

export type ActionDropDownReducer = {
  state: ActionDropDownStateType;
  action: ActionDropDownActions;
};

export interface renameFileType {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}
