import { Navigate, Outlet } from "react-router";
import Menu from "../componentes/Menu";
import verificaAutenticacao from "./verificaAutenticacao";

export default function RotaPrivada() {
  console.log("RotaPrivada: Verificando autenticação do usuário.");
  const token = localStorage.getItem("Bearer");
  
  if ( !token) {
    verificaAutenticacao();
  }

  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}
