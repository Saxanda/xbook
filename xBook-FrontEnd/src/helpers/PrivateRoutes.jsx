import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function PrivateRoutes() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return (
    <>
      <Header />
      {token ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
}
