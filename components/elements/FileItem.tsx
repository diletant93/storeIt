import { convertFileToUrl, getFileType } from "@/lib/utils";
import UploadingFilePreview from "./UploadingFilePreview";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import { FileItemProps } from "@/types/props";

export default function FileItem({file, onRemoveFile}:FileItemProps) {
    const {type, extension} = getFileType(file.name)

    return (
        <li className='uploader-preview-item'>
            <div className='flex items-center gap-3'>
                <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />
            </div>
            <UploadingFilePreview fileName={file.name} />
            <Image src='/assets/icons/remove.svg' width={24} height={24} alt='remove'
                onClick={(e) => {
                    onRemoveFile(e, file.name)
                }}
            />
        </li>
    );
}
