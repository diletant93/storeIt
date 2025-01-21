import { IFileType } from "@/types/types";
import Card from "./Card";
import { getFiles } from "@/lib/actions/file.actions";
import { FilesProps } from "@/types/props";
import { getFileTypesParams } from "@/lib/utils";
export default async function FileList({ type, searchParams }: FilesProps) {
    const {query:searchText, sort} = (await searchParams) as any
    const types = getFileTypesParams(type)
    const files = await getFiles({searchText, sort,types})
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
