import { Navigate } from "react-router";

export default function verificaAutenticacao() {
    localStorage.clear();
    window.location.href = "/";
    return;
};
