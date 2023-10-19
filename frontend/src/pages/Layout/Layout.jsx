import {Outlet} from "react-router-dom";
import NavBarDefault from "../../components/NavBarDefault";

const Layout = () => {
  return (
    <>
      <NavBarDefault/>
      <Outlet/>
    </>
  )
};

export default Layout;
