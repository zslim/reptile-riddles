import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <>
            <div className="bg-kahoot-lightpurple">Layout</div>
            <Outlet />
        </>
    )
};

export default Layout;