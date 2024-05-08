import { createContext, useContext, useEffect, useState } from "react";
import { getCredentials, userLogin, userLogout } from "../providers/userProvider";
import { useUser } from "./UserContextProvider";

const GUEST = {playerName: "Guest", playerId: null};
const PlayerContext = createContext({...GUEST});
export const UserContextProvider = ({children}) => {
  const [player, setPlayer] = useState({...GUEST});
  const [loading, setLoading] = useState(true);
  const {user} = useUser();

  async function getUserName() {
    try {
      setLoading(true);
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


  return (
    <PlayerContext.Provider value={player}>
      {!loading ?? children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);

// export default PlayerContextProvider;
