import Header from "@/components/shared/Header";
import MobileNavigation from "@/components/shared/MobileNavigation";
import Sidebar from "@/components/shared/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex h-screen">
            <Sidebar/>
            <section className="h-full flex flex-1 flex-col">
                <MobileNavigation/>
                <Header/>
                <div className="main-content">
                    {children}
                </div>
            </section>
        </main>
    );
}
