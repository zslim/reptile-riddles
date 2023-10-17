import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const pathName = useLocation().pathname;

    return (
        <>
           { pathName !== '/task' ? <div className="bg-kahoot-purple fixed p-3 font-bold text-white">Layout</div>
            : null
           } 
            <Outlet />
        </>
    )
};

export default Layout;