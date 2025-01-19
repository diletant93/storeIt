import { IFileType } from "@/types/types";
import ImageThumbnail from "./ImageThumbnail";
import DetailRow from "./DetailRow";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";

export default function FileDetails({file}:{file:IFileType}) {
  return (
    <>
    <ImageThumbnail file={file}/>
    <div className="flex flex-col gap-3 px-2 pt-2 text-left divide-y-2   divide-gray-200">
        <DetailRow label="Format:" value={file.extension}/>
        <DetailRow label="Size:" value={convertFileSize(file.size)}/>
        <DetailRow label="Owner:" value={file.owner.fullName}/>
        <DetailRow label="LastEdit:" value={formatDateTime(file.$createdAt)}/>
    </div>
    </>
  );
}
