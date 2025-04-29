import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";
import Loading from "../components/common/Loading";

function ProtectdRoute() {
  const { userLoggedIn, loading } = useFirebase();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectdRoute;
