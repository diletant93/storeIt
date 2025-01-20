import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

import ActionDropdown from "@/components/shared/ActionDropDown";
import { Chart } from "@/components/shared/Chart";
import FormattedDateTime from "@/components/elements/FormattedDateTime";
import Thumbnail from "@/components/elements/Thumbnail";
import { Separator } from "@/components_shadcn/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { IFileType } from "@/types/types";
import RecentFiles from "@/components/elements/RecentFiles";
import { Suspense } from "react";
import Loader from "@/components/elements/Loader";

const Dashboard = async () => {
  // Parallel requests
  const totalSpace = await getTotalSpaceUsed()

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);
  if (totalSpace.used === 0) return <div className="dashboard-container"><Chart used={0} /></div>
  return (
    <div className="dashboard-container">
      <section>
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
      </section>

      {/* Recent files uploaded */}
      <section className="dashboard-recent-files relative">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        <Suspense fallback={<Loader/>}>
          <RecentFiles />
        </Suspense>
      </section>
    </div>
  );
};

export default Dashboard;