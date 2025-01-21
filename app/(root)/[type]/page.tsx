import Loader from "@/components/elements/Loader";
import FileList from "@/components/shared/FileList";
import Sort from "@/components/shared/Sort";
import { getTotalSize } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import { SearchParamProps } from "@/types/props";
import { Suspense } from "react";
export default async function Page({ params, searchParams }: SearchParamProps) {
    let type = (await params)?.type as string
    const types = getFileTypesParams(type)
    const totalSize = await getTotalSize({types})
    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 capitalize">
                    {type}
                </h1>
                <div className="total-size-section">
                    <p className="body-1 min-w-[5rem]">
                        Total: <span className="h5">
                            {totalSize} 
                        </span>
                    </p>
                    
                    <div className="sort-container">
                        <p className="body-1 hidden sm:block text-light-200 min-w-[5rem]">
                            Sort by:
                        </p>
                        <Sort searchParams={searchParams}/>
                    </div>
                </div>
            </section>
            <Suspense fallback={<Loader/>}>
                <FileList type={type} searchParams={searchParams}/>
            </Suspense> 
        </div>
    );
}
