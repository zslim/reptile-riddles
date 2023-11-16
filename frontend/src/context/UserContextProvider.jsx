import { createContext, useContext, useEffect, useState } from "react";
import { getCredentials } from "../controllers/userProvider";

const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const NO_USER = {username: "", roles: []};
  const [user, setUser] = useState({username: "", roles: []});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkCredentials() {
      try {
        setLoading(true);
        const userCredentials = await getCredentials();
        if (userCredentials.status === 200) {
          setUser(userCredentials);
        } else {
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

    checkCredentials();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContextProvider;