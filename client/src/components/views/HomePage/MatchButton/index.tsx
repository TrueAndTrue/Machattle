import { FunctionComponent } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../../../contexts/Context';
import { useSocket } from '../../../../hooks/useSocket';
import { useReducer } from 'react';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from '../../../../contexts/Context';

interface IProps {
  data: string,
}

export const MatchButton: FunctionComponent<IProps> = (data) => {

  const { socket, uid, users, inQueue } = useContext(SocketContext).SocketState
  const navigate = useNavigate();
  const [matchFound, setMatchFound] = useState(false);
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);

  socket?.connect();

  socket?.on('match_found', () => {
    setMatchFound(true);
    navigate('/battle');
  })


  const QueueHandler = () => {
    console.log(uid)
    SocketDispatch({type: 'queue_user', payload: uid})
    socket?.emit('queue_user', (uid))
    console.log(inQueue)
  }

  return (
    <div className={styles.match_button_container}>
      <h1>{matchFound && 'MATCH FOUND!'}</h1>
      <Button className={styles.match_button} onClick={QueueHandler}> {data.data} </Button>
    </div>
  )
}