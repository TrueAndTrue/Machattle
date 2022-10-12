import { FunctionComponent } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../../../contexts/Context';
import { useSocket } from '../../../../hooks/useSocket';
import { useReducer } from 'react';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from '../../../../contexts/Context';
import { useSelector } from 'react-redux';

interface IProps {
  data: string,
  mode : string
}

export const MatchButton = ({data , mode} : IProps) => {

  const { socket, users, inQueue } = useContext(SocketContext).SocketState
  const navigate = useNavigate();
  const [matchFound, setMatchFound] = useState(false);
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);

  socket?.connect();

  const userInfo = useSelector((state: any) => state.currentUser)

  // socket?.on('match_found', () => {
  //   setMatchFound(true);
  //   navigate('/battle');
  // })

  const QueueHandler = () => {
    SocketDispatch({type: 'queue_user', payload: userInfo.uid})
    socket?.emit('queue_user', (userInfo.uid))
  }

  const onClick = () => {
    if (mode == 'ranked') QueueHandler();
    else navigate('/battle')
  } 

  return (
    <div className={styles.match_button_container}>
      <h1>{matchFound && 'MATCH FOUND!'}</h1>
      <Button className={styles.match_button} onClick={onClick}> {data} </Button>
    </div>
  )
}