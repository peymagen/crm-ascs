import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";

const Basic = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth) as {
    isAuthenticated: boolean;
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Basic;
