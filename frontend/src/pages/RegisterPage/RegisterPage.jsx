import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../providers/userProvider";
import AccessFormInput from "../../components/AccessFormInput";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      setLoading(true);
      await userRegister({email, username, password});
      navigate("/login");
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
        <div className="mt-12 mb-16 text-white text-center font-bold text-2xl">Sign Up</div>
        <div className="grid grid-cols-1 gap-4 w-5/6 mx-auto">
          <AccessFormInput value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           type={"text"} id={"user-name"}
                           labelText={"Username"}/>
          <AccessFormInput value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           type={"email"} id={"email"}
                           labelText={"E-mail"}/>
          <AccessFormInput value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type={"password"} id={"password"}
                           labelText={"Password"}/>
          <button className={`mr-4 mt-6 text-white w-full font-bold p-4 bg-green-800  
                  ${!loading && "hover:bg-green-700 hover:cursor-pointer"}`}
                  disabled={loading}
                  onClick={() => handleRegister()}>
            SIGN UP
          </button>
          <div className="mb-8">
            <span className="text-stone-300 text-sm">Already have an account? </span>
            <Link to={"/login"}>
              <button className={`text-white text-sm text-left underline underline-offset-2 cursor-default 
              ${!loading && "hover:text-stone-200 hover:cursor-pointer"}`}
                      disabled={loading}>
                Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
