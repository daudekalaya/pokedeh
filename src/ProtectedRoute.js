import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //Check URL params for password
  const [searchParam] = useSearchParams()
  if(searchParam.get("password") !== "secret") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // TODO: replace this
};

export default ProtectedRoute;
