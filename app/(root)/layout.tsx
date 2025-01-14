import Header from "@/components/shared/Header";
import MobileNavigation from "@/components/shared/MobileNavigation";
import Sidebar from "@/components/shared/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        redirect('/sign-up')
    }
    return (
        <main className="flex h-screen">
            <Sidebar {...currentUser}/>
            <section className="h-full flex flex-1 flex-col">
                <MobileNavigation />
                <Header />
                <div className="main-content">
                    {children}
                </div>
            </section>
        </main>
    );
}
