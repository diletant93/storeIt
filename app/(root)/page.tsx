import RecentFiles from "@/components/elements/RecentFiles";
import { Suspense } from "react";
import Loader from "@/components/elements/Loader";
import Stats from "@/components/shared/Stats";
import { getFileIcon } from "@/lib/utils";
import { getFiles } from "@/lib/actions/file.actions";
import FileUploader from "@/components/shared/FileUploader";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const files = await getFiles({})
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect('/sign-in')
  return (
    <>
      {
        files ? (
          <div className="dashboard-container" >
            <section className="relative">
              <Suspense fallback={<Loader />}>
                <Stats />
              </Suspense>
            </section>
            <section className="dashboard-recent-files relative">
              <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
              <Suspense fallback={<Loader />}>
                <RecentFiles />
              </Suspense>
            </section>
          </div >
        ) : (
          <div className=" h-full flex-center">
            <FileUploader accountId={currentUser.accountId} ownerId={currentUser.$id} className="min-w-[500px] min-h-[500px]  " />
          </div>
        )}

    </>
  );
};

export default Dashboard;