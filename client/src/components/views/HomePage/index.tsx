
import { useContext, useEffect } from 'react';
import SocketContext from '../../../contexts/Context';
import { ShootingStar } from '../QueuePage/ShootingStar';
import { MatchButton } from './MatchButton';
import { RecentEventsFeed } from './RecentEventsFeed/index';
import { SelectMatchContainer } from './SelectMatchContainer/index';
import styles from './styles.module.css';

export function HomePage () {

  const { uid, users } = useContext(SocketContext).SocketState
  const { socket } = useContext(SocketContext).SocketState;
  socket?.connect();
  useEffect(() => {
    socket?.removeAllListeners('winner');
  }, [])

  return (
    <div className={styles.home_page_container}>
      <ShootingStar />
      <SelectMatchContainer />
      <RecentEventsFeed />
    </div>
  );
}
