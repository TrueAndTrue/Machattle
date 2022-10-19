
import { useContext, useEffect, useState } from 'react';
import { getRecentChallenges } from "../../../services/challengeServices";
import { IChallenge } from '../../../types';

import SocketContext from '../../../contexts/Context';
import { ShootingStar } from '../QueuePage/ShootingStar';
import { MatchButton } from './MatchButton';
import { RecentEventsFeed } from './RecentEventsFeed/index';
import { SelectMatchContainer } from './SelectMatchContainer/index';
import styles from './styles.module.css';

export function HomePage () {
  const [recentEvents, setRecentEvents] = useState<IChallenge[]>([]);
  const { uid, users } = useContext(SocketContext).SocketState
  const { socket } = useContext(SocketContext).SocketState;
  socket?.connect();
  useEffect(() => {
    socket?.removeAllListeners('winner');
    getEvents();
  }, [])


  const getEvents = async () => {
    const challenges = await getRecentChallenges();
    setRecentEvents(challenges)
  }

  return (
    <div className={styles.home_page_container}>
      <ShootingStar />
      <SelectMatchContainer />
      <RecentEventsFeed recentEvents={recentEvents}/>
    </div>
  );
}
