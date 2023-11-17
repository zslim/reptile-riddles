import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContextProvider";
import authenticate from "./authenticator";

const Protected = ({ children, roleRequirement }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const authorized = useMemo(() => {
    return authenticate(user, roleRequirement);
  }, [user, roleRequirement]);

  // const REQUIREMENTS = {
  //   user: ["ROLE_USER"],
  //   guest: ["ROLE_USER", "ROLE_GUEST"]
  // };

  useEffect(() => {
    if (!authorized) {
      navigate("/login");
    }
  }, [authorized]);

  // function authorizeUser() {
  //   let authorized = false;
  //   user.roles.forEach((role) => REQUIREMENTS[roleRequirement].includes(role) ? (authorized = true) : null);
  //   return authorized;
  // }

  return <>{authorized && children}</>;
};

export default Protected;
