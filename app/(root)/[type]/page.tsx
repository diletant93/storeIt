import Loader from "@/components/elements/Loader";
import FileList from "@/components/shared/FileList";
import Sort from "@/components/shared/Sort";
import { SearchParamProps } from "@/types/props";
import { Suspense } from "react";
export default async function Page({ params, searchParams }: SearchParamProps) {
    let type = (await params)?.type as string
    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 capitalize">
                    {type}
                </h1>
                <div className="total-size-section">
                    <p className="body-1">
                        Total: <span className="h5">
                            0 MB
                        </span>
                    </p>
                    <div className="sort-container">
                        <p className="body-1 hidden sm:block text-light-200">
                            Sort by:
                        </p>
                        <Sort />
                    </div>
                </div>
            </section>
            <Suspense fallback={<Loader/>}>
                <FileList type={type} searchParams={searchParams}/>
            </Suspense> 
        </div>
    );
}
