import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import SocketContext from "../../../../contexts/Context";
import { useReducer } from "react";
import {
  defaultSocketContextState,
  SocketReducer,
} from "../../../../contexts/Context";
import { useSelector } from "react-redux";

interface IProps {
  data: string;
  mode: string;
}

export const MatchButton = ({ data, mode }: IProps) => {
  const { socket } = useContext(SocketContext).SocketState;
  const navigate = useNavigate();
  const [matchFound, setMatchFound] = useState(false);
  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );

  socket?.connect();

  const { uid, rank } = useSelector((state: any) => state.currentUser);

  const QueueHandler = () => {
    SocketDispatch({ type: "queue_user", payload: uid });
    socket?.emit("queue_user", uid, rank);
  };

  const onClick = () => {
    if (mode == "ranked") QueueHandler();
    else navigate("/battle");
  };

  return (
    <div className={styles.match_button_container}>
      <h1>{matchFound && "MATCH FOUND!"}</h1>
      <Button className={styles.match_button} onClick={onClick}>
        {" "}
        {data}{" "}
      </Button>
    </div>
  );
};
