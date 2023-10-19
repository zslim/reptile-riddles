import {Outlet} from "react-router-dom";
import NavBarDefault from "../../components/NavBarDefault";

const Layout = () => {
  return (
    <div className={"bg-[#050409]"}>
      <div className={"w-full h-fit bg-inherit"}>
        <NavBarDefault/>
      </div>
      <div className={"h-[calc(100%-52px)] fixed flex bg-inherit w-full"}>
        <div className={"max-h-full max-w-full flex bg-inherit mx-auto"}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
};

export default Layout;
