import { LinearProgress } from '@mui/material';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useReducer } from 'react';
import SocketContext, { SocketReducer } from '../../../contexts/Context';
import { useSelector, useDispatch } from 'react-redux';
import { defaultSocketContextState } from '../../../contexts/Context';
import { updateMatch } from '../../../state/actions/match';

import robo from '../../../assets/CodeBot004.gif'

export function QueuePage () {

  const { socket, users, inQueue } = useContext(SocketContext).SocketState
  const navigate = useNavigate();
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
  const dispatch = useDispatch();
  socket?.connect();

  const userInfo = useSelector((state: any) => state.currentUser)

  // socket?.on('match_found', (player1uid, player2uid) => {
  //   console.log(player1uid, player2uid)
  //   dispatch(updateMatch({
  //     player1: player1uid,
  //     player2: player2uid,
  //     matchFound: true,
  //     winner: '',
  //     loser: ''
  //   }));
  //   navigate('/battle');
  // })

  return (
    <div className={styles.queue_page_container}>
      <div className={styles.queue_page_card}>
        <p className={styles.queue_text}>Searching for match...</p>
        <LinearProgress color="primary" className={styles.loading_bar} />
        <img src={robo} alt='robot logo' className={styles.robot_mascot} />
      </div>
    </div>
  )
}