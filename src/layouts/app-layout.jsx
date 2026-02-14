import Header from "@/components/header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>
      <div className="mt-10 p-10 text-center bg-gray-800">
        Made with 💗 by Rohan
      </div>
    </div>
  );
}

export default AppLayout;
