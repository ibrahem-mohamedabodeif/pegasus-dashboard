import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authintication";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  //1- Load auth user
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuth = data?.role === "authenticated";

  //2-if there is no auth user navigate to sign page

  useEffect(
    function () {
      if (!isAuth && !isLoading) navigate("/sign-in");
    },
    [isLoading, navigate, isAuth]
  );

  //3- if there is auth user
  return children;
}
