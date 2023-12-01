import React, { useEffect, useState } from 'react';
import QuizFilterContainer from "../../components/QuizFilterContainer";
import Loading from "../../components/Loading";
import { getGameList } from "../../providers/gameProvider";
import GameListContainer from "../../components/GameListContainer";

const GameListPage = () => {
  const [loading, setLoading] = useState(true);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    async function getGames() {
      try {
        setLoading(true);
        const games = await getGameList();
        setGameList(games);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    getGames();
  }, []);

  return (
    <>
      {loading ? <Loading/>
        : <div className="w-full h-full flex flex-row text-white">
          <GameListContainer gameList={gameList} loading={loading}/>
          <QuizFilterContainer/>
        </div>
      }
    </>
  );
};

export default GameListPage;
