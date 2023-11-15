import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContextProvider";

const Protected = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return <>{user && children}</>;
};

export default Protected;