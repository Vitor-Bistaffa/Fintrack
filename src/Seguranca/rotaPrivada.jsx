import { Navigate, Outlet } from "react-router";
import Menu from "../componentes/Menu";

export default function RotaPrivada() {
  const token = localStorage.getItem("Bearer");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}
