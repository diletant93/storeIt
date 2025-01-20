import { IFileType } from "@/types/types";
import Link from "next/link";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropDown from "../shared/ActionDropDown";
import { getFiles } from "@/lib/actions/file.actions";
import Loader from "./Loader";

export default async function RecentFiles() {
    const files = await getFiles({})
    if (!files) return <p>No files uploaded</p>
    return (
        <>
            {files.length > 0 ? (
                <ul className="mt-5 flex flex-col gap-5">
                    {files.map((file: IFileType) => (
                        <Link
                            href={file.url}
                            target="_blank"
                            className="flex items-center gap-3"
                            key={file.$id}
                        >
                            <Thumbnail
                                type={file.type}
                                extension={file.extension}
                                url={file.url}
                            />

                            <div className="recent-file-details">
                                <div className="flex flex-col gap-1">
                                    <p className="recent-file-name">{file.name}</p>
                                    <FormattedDateTime
                                        date={file.$createdAt}
                                        className="caption"
                                    />
                                </div>
                                <ActionDropDown file={file} />
                            </div>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p className="empty-list">No files uploaded</p>
            )}
        </>
    );
}
