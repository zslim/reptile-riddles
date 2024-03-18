import React, { useEffect, useState } from "react";
import { Button, IconButton, Navbar, Typography, } from "@material-tailwind/react";
import PlayIcon from "../../assets/icons/PlayIcon";
import QuizzesIcon from "../../assets/icons/QuizzesIcon";
import MyQuizIcon from "../../assets/icons/MyQuizIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContextProvider";
import authenticate from "../../context/authenticator";

export function NavBarDefault() {
  // const [openNav, setOpenNav] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const {user, logout} = useUser();

  function isLoggedIn() {
    return authenticate(user, "user");
  }

  useEffect(() => {
    setHasUser(() => isLoggedIn());
    // window.addEventListener(
    //   "resize",
    //   () => window.innerWidth >= 960 && setOpenNav(false),
    // );
  }, []);

  async function handleLogout() {
    try {
      await logout();
      setHasUser(false);
    }
    catch (e) {
      console.error(e);
    }
  }

  const navList = (
    <ul className="mt-2 mb-4 flex  gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="gamelist" className="flex items-center">
          <PlayIcon/>
          <span className="hidden lg:block">Games</span>
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/quiz/all" className="flex items-center">
          <QuizzesIcon/>
          <span className="hidden lg:block">Quizzes</span>
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/quiz/my" className="flex items-center">
          <MyQuizIcon/>
          <span className="hidden lg:block">My Quizzes</span>
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/login" className="flex items-center">
          <UserIcon/>
          <span className="hidden lg:block">Account</span>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-inherit">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to={"/"}>
          Reptile Riddles
        </Link>
        <div className="">{navList}</div>
        <div className="flex items-center gap-x-1">
          {hasUser ?
            <Link to={"/login"}>
              <Button variant="text" size="sm" className="hidden lg:inline-block" onClick={() => handleLogout()}>
                <span className="hidden lg:block">Logout</span>
              </Button>
            </Link>
            : <>
              <Link to={"/login"}>
                <Button variant="text" size="sm" className="hidden lg:inline-block">
                  <span className="hidden lg:block">Login</span>
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block">
                  <span className="hidden lg:block">Sign up</span>
                </Button>
              </Link>
            </>
          }
        </div>
        {/*<IconButton*/}
        {/*  variant="text"*/}
        {/*  className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"*/}
        {/*  ripple={false}*/}
        {/*  onClick={() => setOpenNav(!openNav)}*/}
        {/*>*/}
        {/*{openNav ? (*/}
        {/*  <svg*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*    fill="none"*/}
        {/*    className="h-6 w-6"*/}
        {/*    viewBox="0 0 24 24"*/}
        {/*    stroke="currentColor"*/}
        {/*    strokeWidth={2}*/}
        {/*  >*/}
        {/*    <path*/}
        {/*      strokeLinecap="round"*/}
        {/*      strokeLinejoin="round"*/}
        {/*      d="M6 18L18 6M6 6l12 12"*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*) : (*/}
        {/*  <svg*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*    className="h-6 w-6"*/}
        {/*    fill="none"*/}
        {/*    stroke="currentColor"*/}
        {/*    strokeWidth={2}*/}
        {/*  >*/}
        {/*    <path*/}
        {/*      strokeLinecap="round"*/}
        {/*      strokeLinejoin="round"*/}
        {/*      d="M4 6h16M4 12h16M4 18h16"*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*)}*/}
        {/*</IconButton>*/}
      </div>
      {/*<MobileNav open={openNav}>*/}
      {/*  <div className="container mx-auto">*/}
      {/*    {navList}*/}
      {/*    <div className="flex items-center gap-x-1">*/}
      {/*      <Button fullWidth variant="text" size="sm" className="">*/}
      {/*        <span>Log In</span>*/}
      {/*      </Button>*/}
      {/*      <Button fullWidth variant="gradient" size="sm" className="">*/}
      {/*        <span>Sign in</span>*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</MobileNav>*/}
    </Navbar>
  );
}

export default NavBarDefault;
