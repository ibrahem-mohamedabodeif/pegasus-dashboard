import {
  faBars,
  faCartShopping,
  faRightFromBracket,
  faShop,
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
      <div className="flex justify-between items-center mt-4 ml-8 mr-8 lg:hidden md:hidden sm:hidden">
        <div className="relative hidden max-sm:block">
          <button onClick={handleOpen}>
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>

          {open && (
            <div className="absolute w-36 rounded-xl top-10 -left-5 flex flex-col border p-4 gap-y-5 shadow-lg bg-white z-50">
              <Link to="/dashboard/productes" onClick={handleOpen}>
                <span className="font-medium">Products</span>
              </Link>
              <Link to="/dashboard/orders" onClick={handleOpen}>
                <span className="font-medium">Orders</span>
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
      <div className="rounded-r-2xl flex flex-col justify-between pt-4 pl-3 pb-4 max-sm:w-16 md:w-16 bg-slate-300 h-screen max-sm:hidden">
        <div className="flex items-center">
          <img
            src="/pegasus.png"
            className="max-sm:max-w-11 md:max-w-11"
            alt="Logo"
          />
        </div>
        <div className="flex flex-col gap-5">
          <NavLink to="productes">
            <FontAwesomeIcon icon={faShop} className="text-2xl" />
          </NavLink>

          <NavLink to="orders">
            <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => mutate()}>
            <FontAwesomeIcon icon={faRightFromBracket} className="text-3xl" />
          </button>
        </div>
      </div>
    </>
  );
}
