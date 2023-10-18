import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="bg-slate-100">Layout</div>
      <Outlet/>
    </div>
  )
};

export default Layout;
