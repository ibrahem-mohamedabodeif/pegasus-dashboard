import {
  faBars,
  faCartShopping,
  faHouse,
  faRightFromBracket,
  faShop,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "../services/authintication";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function SideBar() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    // nav bar in small media
    <>
      <div className="flex justify-between items-center mt-4 ml-8 mr-8 text-white lg:hidden md:hidden sm:hidden">
        <div className="relative hidden max-sm:block">
          <button onClick={handleOpen}>
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>

          {open && (
            <div className="absolute w-36 rounded-xl top-10 -left-5 flex flex-col border p-4 gap-y-5 shadow-lg bg-[#2a2d2b] z-50 text-white border-transparent">
              <Link to="/dashboard/home" onClick={handleOpen}>
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link to="/dashboard/productes" onClick={handleOpen}>
                <span className="font-medium">Products</span>
              </Link>
              <Link to="/dashboard/orders" onClick={handleOpen}>
                <span className="font-medium">Orders</span>
              </Link>
              <Link to="/dashboard/customers" onClick={handleOpen}>
                <span className="font-medium">Customers</span>
              </Link>
            </div>
          )}
        </div>
        <div className="relative flex items-center space-x-2">
          <img src="/pegasus.png" className="w-10" alt="Logo" />
          <span className="uppercase font-bold text-2xl">Pegasus</span>
        </div>
        <div>
          <button onClick={() => mutate()}>
            <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
          </button>
        </div>
      </div>
      {/* nav bar in large media */}
      <div className="flex flex-col justify-between py-4 px-4 h-screen max-sm:hidden border-r-2 border-[#2a2d2b] ">
        <div className="flex items-center gap-3">
          <img src="/pegasus.png" className="w-14" alt="Logo" />
          <span className="text-3xl font-bold text-white">PEGASUS</span>
        </div>
        <div className="flex flex-col gap-14 text-white">
          <NavLink to="home" className="flex items-center gap-3 pl-4">
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
            <span className="text-xl tracking-wider ">Dashboard</span>
          </NavLink>

          <NavLink to="productes" className="flex items-center gap-3 pl-4">
            <FontAwesomeIcon icon={faShop} className="text-xl" />
            <span className="text-xl tracking-wider">Products</span>
          </NavLink>

          <NavLink to="orders" className="flex items-center gap-3 pl-4">
            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            <span className="text-xl tracking-wider">Orders</span>
          </NavLink>
          <NavLink to="customers" className="flex items-center gap-3 pl-4">
            <FontAwesomeIcon icon={faUserGroup} className="text-xl " />
            <span className="text-xl tracking-wider">Customers</span>
          </NavLink>
        </div>
        <div
          className="flex items-center gap-3 text-white pl-4 "
          onClick={() => mutate()}
        >
          <button>
            <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl" />
          </button>
          <span className="text-xl">Log out</span>
        </div>
      </div>
    </>
  );
}
