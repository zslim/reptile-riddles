import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContextProvider";
import authenticate from "./authenticator";

const Protected = ({children, roleRequirement}) => {
  const {user} = useUser();
  const navigate = useNavigate();

  // const REQUIREMENTS = {
  //   user: ["ROLE_USER"],
  //   guest: ["ROLE_USER", "ROLE_GUEST"]
  // };

  useEffect(() => {
    if (!authenticate(user, roleRequirement)) {
      navigate("/login");
    }
  }, []);

  // function authorizeUser() {
  //   let authorized = false;
  //   user.roles.forEach((role) => REQUIREMENTS[roleRequirement].includes(role) ? (authorized = true) : null);
  //   return authorized;
  // }

  return <>{authenticate(user, roleRequirement) && children}</>;
};

export default Protected;
