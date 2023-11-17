import { createContext, useContext, useEffect, useState } from "react";
import { getCredentials, userLogin, userLogout } from "../controllers/userProvider";

const UserContext = createContext({});
const NO_USER = {username: "", roles: []};

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({...NO_USER});
  const [loading, setLoading] = useState(true);

  async function checkCredentials() {
    try {
      setLoading(true);
      const userCredentials = await getCredentials();
      if (userCredentials !== null) {
        setUser(userCredentials);
      }
      else {
        setUser({...NO_USER});
      }
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkCredentials();
  }, []);

  async function login(username, password) {
    try {
      setLoading(true);
      const userCredentials = await userLogin({username, password});
      setUser(userCredentials);
    }
    finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await userLogout();
      setUser({...NO_USER});
    }
    catch (e) {
      console.error(e);
    }
    finally {
      await checkCredentials();
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{user, login, logout}}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContextProvider;
