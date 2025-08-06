import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

const PublicRoute = () => {
  return (
    <>
      <Sidebar>
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      </Sidebar>
    </>
  );
};

export default PublicRoute;
