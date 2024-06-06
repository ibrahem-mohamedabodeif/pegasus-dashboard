import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-2 fixed w-full h-full max-sm:flex max-sm:flex-col max-sm:space-x-0 md:space-x-10">
      <div className="col-span-1 max-sm:col-span-12">
        <SideBar />
      </div>
      <div className="col-span-11 max-sm:col-span-12 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
