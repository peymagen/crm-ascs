import { Outlet } from "react-router-dom";

const Basic = () => {
  console.log("heheh");
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Basic;
