import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContextProvider";

const Protected = ({ children, roleRequirement }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const REQUIREMENTS = {
    user: ["ROLE_USER"],
    guest: ["ROLE_USER", "ROLE_GUEST"]
  }

  useEffect(() => {
    if (!authorizeUser(user)) {
      navigate("/login");
    }
  }, []);

  function authorizeUser(user){
    let authorized = false;
    user.roles.map((role) => REQUIREMENTS[roleRequirement].includes(role) ? (authorized = true) : null)
    return authorized;
  }

  return <>{authorizeUser(user) && children}</>;
};

export default Protected;
