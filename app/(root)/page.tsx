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
import Stats from "@/components/shared/Stats";

const Dashboard = async () => {
  return (
    <div className="dashboard-container">
      <section className="relative">
        <Suspense fallback={<Loader/>}>
          <Stats/>
        </Suspense>
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