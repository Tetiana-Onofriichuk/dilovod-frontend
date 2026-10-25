import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100">
      <Sidebar />

      <div className="flex h-full min-h-0 flex-1 flex-col">
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-8 pt-2 pb-1">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
