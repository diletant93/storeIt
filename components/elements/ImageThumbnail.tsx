import { IFileType } from "@/types/types";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";

export default function ImageThumbnail({file}:{file:IFileType}) {
  return (
    <div className="file-details-thumbnail">
       <Thumbnail type={file.type} extension={file.extension} url={file.url}/>
       <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption"/>
       </div>
    </div>
  );
}
