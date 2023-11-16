import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AccessFormInput from "../../components/AccessFormInput";
import { useUser } from "../../context/UserContextProvider";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {user, login} = useUser();
  const navigate = useNavigate();

  async function handleLogin(username, password) {
    try {
      setLoading(true);
      await login(username, password);
      navigate("/");
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[calc(100%-52px)] fixed flex bg-inherit w-full align-items">
      <div className="w-3/12 m-auto pb-2 bg-zinc-800 border border-zinc-500">
        <div className="mt-12 mb-16 text-white text-center font-bold text-2xl">Login</div>
        <div className="grid grid-cols-1 gap-4 w-5/6 mx-auto">
          <AccessFormInput value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           id={"user-name"} type={"text"} labelText={"Username"}/>
          <AccessFormInput value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           id={"password"} type={"password"} labelText={"Password"}/>
          <button className={`mr-4 mt-6 text-white w-full font-bold p-4 bg-green-800  
                  ${!loading && "hover:bg-green-700 hover:cursor-pointer"}`}
                  disabled={loading}
                  onClick={() => handleLogin(username, password)}>
            LOGIN
          </button>
          <div className="mb-8">
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
};

export default LoginPage;
