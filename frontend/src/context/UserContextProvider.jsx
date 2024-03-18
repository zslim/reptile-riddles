import { createContext, useContext, useEffect, useState } from "react";
import { getCredentials, userLogin, userLogout } from "../providers/userProvider";

const UserContext = createContext({});
const NO_USER = {username: "", roles: [], playerName: "Guest"};

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({...NO_USER});
  const [loading, setLoading] = useState(true);

  async function checkCredentials() {
    try {
      setLoading(true);
      const userCredentials = await getCredentials();
      if (userCredentials !== null) {
        setUser({...userCredentials, playerName: userCredentials.username});
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

  function changePlayerName(playerName) {
    setUser({...user, playerName: playerName});
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
    <UserContext.Provider value={{user, login, logout, changePlayerName}}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContextProvider;
