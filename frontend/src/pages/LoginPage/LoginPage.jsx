import { Link } from "react-router-dom";
import React, { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState();

  return (
    <div className="h-[calc(100%-52px)] fixed flex bg-inherit w-full">
      <div className="w-3/12 h-4/6 m-auto bg-zinc-800 border border-zinc-500">
        <div className="mt-12 mb-16 text-white text-center font-bold text-2xl">Login</div>
        <div className="grid grid-cols-1 gap-4 w-5/6 mx-auto">
          <div>
            <label htmlFor="email"
                   className="text-white block mb-1">E-mail</label>
            <input className="w-full bg-[#050409] text-white p-1 border border-zinc-700"
                   type="email" id="email"
            />
          </div>
          <div>
            <label htmlFor="password"
                   className="text-white block mb-1">Password</label>
            <input className="w-full bg-[#050409] text-white p-1 border border-zinc-700"
                   type="password" id="password"
            />
          </div>
          <button className={`mr-4 mt-6 text-white w-full font-bold p-4 bg-green-800  
                  ${!loading && "hover:bg-green-700 hover:cursor-pointer"}`}
                  disabled={loading}>
            LOGIN
          </button>
          <div>
            <span className="text-stone-300 text-sm">Doesn't have an account yet? </span>
            <Link to={"/register"}>
              <button className={`text-white text-sm text-left underline underline-offset-2 cursor-default 
                      ${!loading && "hover:text-stone-200 hover:cursor-pointer"}`}
                      disabled={loading}>
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
