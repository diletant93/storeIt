import { IFileType } from "@/types/types";
import Card from "./Card";
import { getFiles } from "@/lib/actions/file.actions";
import { FilesProps } from "@/types/props";
import { getFileTypesParams, parseQueryString } from "@/lib/utils";

export default async function FileList({ type, searchParams }: FilesProps) {
    const searchQueryString = ((await searchParams)?.query) as string
    const sort = ((await searchParams)?.sort) as string
    const {searchText, limit} =parseQueryString(searchQueryString)
    const types = getFileTypesParams(type)
    const files = await getFiles({types,searchText,sort,limit})
    if(!files) return null
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
