import Card from "@/components/shared/Card";
import Sort from "@/components/shared/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { IFileType } from "@/types/types";
import { redirect } from "next/navigation";

interface PageParams {
    params: {
        type: string;
    };
}
export default async function Page({ params }: PageParams) {
    const type = (await params)?.type as string
    try {
        const files = await getFiles()
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
                {/* render the files  */}
                {files.length > 0 ? (
                    <section className="file-list">
                        {(files as IFileType[]).map((file: IFileType) => (
                            <Card file={file} key={file.$id} />
                        ))}
                    </section>
                ) : (
                    <section>

                    </section>
                )}
            </div>
        );
    } catch (error) {
        if (error instanceof Error) {
            return (<p>{error.message}</p>)
        }
        return (<p>Nothing</p>)
    }
}
