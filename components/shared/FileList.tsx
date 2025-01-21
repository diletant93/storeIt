import { IFileType } from "@/types/types";
import Card from "./Card";
import { getFiles } from "@/lib/actions/file.actions";
import { FilesProps } from "@/types/props";
import { getFileTypesParams, parseQueryString } from "@/lib/utils";


export default async function FileList({ type, searchParams }: FilesProps) {
    const searchQueryString = ((await searchParams)?.query) as string
    const {searchText, sort, limit, page} = parseQueryString(searchQueryString)
    const types = getFileTypesParams(type)
    const files = await getFiles({searchText, sort, limit, page,types} )
    if(!files) return <p className="absolute top-[54%] left-[58%] text-brand ">No files</p>
    return (
        <>
        {
            files.length > 0 && (
                <section className="file-list">
                    {(files as IFileType[]).map((file: IFileType) => (
                        <Card file={file} key={file.$id} />
                    ))}
                </section>
            ) 
        }
        </>
    );
}
