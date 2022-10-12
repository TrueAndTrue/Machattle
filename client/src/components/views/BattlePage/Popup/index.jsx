import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Popup() {

  const { winner } = useSelector((state) => state.match);
  const thisUser = useSelector((state) => state.currentUser.uid)
  const [ isWinner, setIsWinner ] = useState(false);
  const [ isLoser, setIsLoser ] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('winner!');
    if (winner === thisUser) {
      setIsWinner(true);
    }
    else {
      setIsLoser(true);
    }

  }, [winner]);

  return (
    <div className={styles.popup_container}>
      <div className={styles.popup}>
        {isWinner && <h1>Congrats! You Won!</h1>}
        {isLoser && <h1>Aw :/ Maybe Next Time!</h1>}
        <div>
          {isWinner && <h2>Your rank increased by 20lp!</h2>}
          {isLoser && <h2>Your rank decreased by 20lp!</h2>}
        </div>
        <Button className={styles.popup_btn} onClick={() => navigate('/home')}>Return Home</Button>
      </div>
    </div>
  );
}
