import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../controllers/userProvider";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(){
    await register({email, username, password});
  }

  return (
    <div className="h-[calc(100%-52px)] fixed flex bg-inherit w-full">
      <div className="w-3/12 h-4/6 m-auto bg-zinc-800 border border-zinc-500">
        <div className="mt-12 mb-16 text-white text-center font-bold text-2xl">Register</div>
        <div className="grid grid-cols-1 gap-4 w-5/6 mx-auto">
          <div>
            <label htmlFor="user-name"
                   className="text-white block mb-1">Username</label>
            <input className="w-full bg-[#050409] text-white p-1 border border-zinc-700"
                   value={username}
                   type="text" id="user-name"
                   onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email"
                   className="text-white block mb-1">E-mail</label>
            <input className="w-full bg-[#050409] text-white p-1 border border-zinc-700"
                   value={email}
                   type="email" id="email"
                   onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"
                   className="text-white block mb-1">Password</label>
            <input className="w-full bg-[#050409] text-white p-1 border border-zinc-700"
                   value={password}
                   type="password" id="password"
                   onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="mr-4 mt-6 text-white w-full font-bold p-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
                  onClick={() => handleRegister()}>
            Register
          </button>
          <div>
            <span className="text-stone-300 text-sm">Already have an account? </span>
            <Link to={"/login"}>
              <button className="text-white text-sm text-left underline underline-offset-2">
                Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
