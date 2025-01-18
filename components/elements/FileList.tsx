import { FileListProps } from "@/types/props";
import FileItem from "./FileItem";

export default function FileList({ files, onRemoveFile }: FileListProps) {
    if (files.length <= 0) return null
    return (
        <ul className='uploader-preview-list'>
            <h4 className='h4 text-light-100'>Uploading</h4>
            {files.map((file, index) => {
                return <FileItem key={index} file={file} onRemoveFile={onRemoveFile} />
            })}
        </ul>
    );
}
