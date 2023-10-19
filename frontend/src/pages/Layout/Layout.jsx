import { Outlet } from "react-router-dom";
import NavBarDefault from "../../components/NavBarDefault";

const Layout = () => {
  return (
    <div className={"bg-[#050409] w-full h-full"}>
      <div className={"w-full h-fit bg-inherit"}>
        <NavBarDefault/>
      </div>
      <div className={"bg-inherit"}>
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
