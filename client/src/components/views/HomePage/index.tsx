import { useContext, useEffect } from 'react';
import SocketContext from '../../../contexts/Context';
import { MatchButton } from './MatchButton';
import { RecentEventsFeed } from './RecentEventsFeed/index';
import { SelectMatchContainer } from './SelectMatchContainer/index';
import styles from './styles.module.css';

export function HomePage () {

  const { uid, users, inQueue } = useContext(SocketContext).SocketState

  console.log(inQueue);

  return (
    <div className={styles.home_page_container}>
      <h2>Socket IO Information</h2>
      <div>Your user ID: {uid}</div>
      <div>Users Online: {users.length}</div>
      <div>Queue Status: {JSON.stringify(inQueue)}</div>
      <MatchButton />
    </div>
  )
}