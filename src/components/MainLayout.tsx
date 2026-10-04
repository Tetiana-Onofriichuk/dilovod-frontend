import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      <Sidebar />

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default MainLayout;
