import { ShareInputProps } from "@/types/props";
import ImageThumbnail from "./ImageThumbnail";
import { Input } from "@/components_shadcn/ui/input";
import { Button } from "@/components_shadcn/ui/button";
import Image from "next/image";

export default function ShareInput({ file, onInputChange, onRemove }: ShareInputProps) {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">Share file with other users</p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(','))}
          className='share-input-field'
          />
          <div className="pt-4">
            <div className="flex justify-between">
              <p className="subtitle-2 text-light-100">
                Shared with:
              </p>
              <p className="subtitle-2 text-light-200">
                {file.users.length} users
              </p>
            </div>
            <ul className="pt-2">
              {file.users.map(email => (
                <li key={email} className="flex items-center justify-between gap-2">
                  <p className="subtitle-2">{email}</p>
                  <Button onClick={()=>{onRemove(email)}} className="share-remove-user">
                     <Image src='/assets/icons/remove.svg' alt="remove" width={24} height={24} className="remove-icon"/>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </>
  );
}
