import Image from "next/image";
import Link from "next/link";
import { Chart } from "./Chart";
import { Separator } from "@radix-ui/react-separator";
import FormattedDateTime from "../elements/FormattedDateTime";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { getTotalSpaceUsed } from "@/lib/actions/file.actions";

export default async function Stats() {
    const totalSpace = await getTotalSpaceUsed()
    const usageSummary = getUsageSummary(totalSpace);
    if (totalSpace.used === 0) return <div className="dashboard-container"><Chart used={0} /></div>

    return (
        <>
            <Chart used={totalSpace.used} />

            {/* Uploaded file type summaries */}
            <ul className="dashboard-summary-list">
                {usageSummary.map((summary) => (
                    <Link
                        href={summary.url}
                        key={summary.title}
                        className="dashboard-summary-card"
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between gap-3">
                                <Image
                                    src={summary.icon}
                                    width={100}
                                    height={100}
                                    alt="uploaded image"
                                    className="summary-type-icon"
                                />
                                <h4 className="summary-type-size">
                                    {convertFileSize(summary.size) || 0}
                                </h4>
                            </div>

                            <h5 className="summary-type-title">{summary.title}</h5>
                            <Separator className="bg-light-400" />
                            <FormattedDateTime
                                date={summary.latestDate}
                                className="text-center"
                            />
                        </div>
                    </Link>
                ))}
            </ul>
        </>
    );
}
