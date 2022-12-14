import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateMatch } from "../../../../state/actions/match";
import SocketContext from "../../../../contexts/Context";

import styles from "./styles.module.css";

interface IProps {
  isRanked: boolean;
  enemyUser: string;
  isPractice: boolean;
}

export function Popup(props: IProps) {
  const { winner } = useSelector((state: any) => state.match);
  const thisUser = useSelector((state: any) => state.currentUser.uid);
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext).SocketState;
  socket?.connect();

  useEffect(() => {
    if (winner === thisUser) {
      setIsWinner(true);
    } else {
      setIsLoser(true);
    }
  }, [winner]);

  const gameOverClick = () => {
    navigate("/home");
    dispatch(
      updateMatch({
        player1: "",
        player2: "",
        matchFound: false,
        winner: "",
        loser: "",
        roomId: "",
      })
    );
  };

  return (
    <div className={styles.popup_container}>
      {!props.isPractice ? (
        <div>
          {" "}
          {props.isRanked ? (
            <div className={styles.popup}>
              {isWinner && <h1>Congrats! You Won!</h1>}
              {isLoser && <h1>Aw :/ Maybe Next Time!</h1>}
              <div>
                {isWinner && <h2>Your rank increased by 20MP!</h2>}
                {isLoser && <h2>Your rank decreased by 20MP!</h2>}
              </div>
              <Button className={styles.popup_btn} onClick={gameOverClick}>
                Return Home
              </Button>
            </div>
          ) : (
            <div className={styles.popup}>
              <h1>You have been invited to a battle by {props.enemyUser}!</h1>
              <div></div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.popup}>
          <h1>Congrats! You Solved It!</h1>
          <h1>1/199 Problems Solved!</h1>
          <Button className={styles.popup_btn} onClick={gameOverClick}>
            Return Home
          </Button>
        </div>
      )}
    </div>
  );
}
