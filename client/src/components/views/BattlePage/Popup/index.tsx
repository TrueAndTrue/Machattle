import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState, useContext  } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMatch } from '../../../../state/actions/match'
import SocketContext from '../../../../contexts/Context';

interface IProps {
  isRanked: boolean;
  enemyUser: string;
  isPractice : boolean;
}

export function Popup(props: IProps) {

  const { winner, roomId } = useSelector((state: any) => state.match);
  const thisUser = useSelector((state: any) => state.currentUser.uid)
  const [ isWinner, setIsWinner ] = useState(false);
  const [ isLoser, setIsLoser ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext).SocketState;
  socket?.connect();
 
  useEffect(() => {
    console.log('winner!');
    if (winner === thisUser) {
      setIsWinner(true);
    }
    else {
      setIsLoser(true);
    }

  }, [winner]);

  const clickHandler = (choice: Boolean) => {
    if (choice) {
      socket?.emit('friendly_accepted', roomId);
    }
    else {
      socket?.emit('friendly_declined', roomId);
    }
  }

  const gameOverClick = () => {
    navigate('/home') 
    dispatch(updateMatch({
      player1: "",
      player2: "",
      matchFound: false,
      winner: "",
      loser: "",
      roomId: ""
    }))
  }

  return (
    <div className={styles.popup_container}>
      {!props.isPractice ? 
     (<div> {props.isRanked ? <div className={styles.popup}>
        {isWinner && <h1>Congrats! You Won!</h1>}
        {isLoser && <h1>Aw :/ Maybe Next Time!</h1>}
        <div>
          {isWinner && <h2>Your rank increased by 20lp!</h2>}
          {isLoser && <h2>Your rank decreased by 20lp!</h2>}
        </div>
        <Button className={styles.popup_btn} onClick = {gameOverClick}>Return Home</Button>
      </div> : 
      <div className={styles.popup}>
        <h1>You have been invited to a battle by {props.enemyUser}!</h1>
      <div>
      </div>
      <Button className={styles.popup_btn} onClick={() => clickHandler(true)}>Accept</Button>
      <Button className={styles.popup_btn} onClick={() => clickHandler(false)}>Decline</Button>
    </div>
      }</div>) : <div className={styles.popup}>
        <h1>Congrats! You Solved It!</h1>
        <Button className={styles.popup_btn} onClick={gameOverClick}>Return Home</Button></div> }
    </div>
  );
}
