import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";

function AdminRoute() {
  const user = useSelector((state) => state.user);
  const userDetails = user?.userDetails;
  

  const loading = false;

  if (loading) return <Loading />;
  
  return userDetails ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute;
