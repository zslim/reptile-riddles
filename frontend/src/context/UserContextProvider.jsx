import { createContext, useContext, useEffect, useState } from "react";
import { getCredentials } from "../controllers/userProvider";

const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({username: "", roles: []});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkCredentials(){
      try {
        setLoading(true);
        const userCredentials = await getCredentials();
        setUser(userCredentials);
      } catch (e) {
        console.error(e);
      } finally {
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