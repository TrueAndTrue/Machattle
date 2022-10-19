import { LinearProgress } from "@mui/material";
import styles from "./styles.module.css";
import { useContext } from "react";
import SocketContext from "../../../contexts/Context";
import { ShootingStar } from "./ShootingStar";

import robo from "../../../assets/CodeBot004.gif";

export function QueuePage() {
  const { socket } = useContext(SocketContext).SocketState;
  socket?.connect();

  return (
    <div className={styles.queue_page_container}>
      <ShootingStar />
      <div className={styles.queue_page_card}>
        <p className={styles.queue_text}>Searching for match...</p>
        <LinearProgress color="primary" className={styles.loading_bar} />
        <img src={robo} alt="robot logo" className={styles.robot_mascot} />
      </div>
    </div>
  );
}
