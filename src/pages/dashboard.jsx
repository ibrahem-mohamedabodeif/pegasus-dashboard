import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";

export default function Dashboard() {
  return (
    <div className="bg-black grid grid-cols-12 fixed w-full h-full max-sm:flex max-sm:flex-col max-sm:space-x-0">
      <div className="col-span-2 max-sm:col-span-12 md:col-span-4 lg:col-span-2">
        <SideBar />
      </div>
      <div className="col-span-10 max-sm:col-span-12 overflow-auto md:col-span-8 lg:col-span-10">
        <Outlet />
      </div>
    </div>
  );
}
