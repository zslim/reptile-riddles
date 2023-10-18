import {Outlet} from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <div className="bg-slate-100">Layout</div>
      <Outlet/>
    </div>
  )
};
