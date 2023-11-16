import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContextProvider";

const Protected = ({ children, requiredRoles }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorizeUser(user)) {
      navigate("/login");
    }
  }, []);

  function authorizeUser(user){
    let authorized = false;
    user.roles.map((role) => requiredRoles.includes(role) ? (authorized = true) : null)
    return authorized;
  }

  return <>{authorizeUser(user) && children}</>;
};

export default Protected;
