import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 p-8 pb-2">{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
