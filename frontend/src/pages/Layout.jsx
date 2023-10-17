import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <>
            <div className="bg-kahoot-purple fixed p-3 font-bold text-white">Layout</div>
            <Outlet />
        </>
    )
};

export default Layout;