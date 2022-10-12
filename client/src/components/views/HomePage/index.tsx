import { useContext, useEffect } from 'react';
import SocketContext from '../../../contexts/Context';
import { ShootingStar } from '../QueuePage/ShootingStar';
import { MatchButton } from './MatchButton';
import { RecentEventsFeed } from './RecentEventsFeed/index';
import { SelectMatchContainer } from './SelectMatchContainer/index';
import styles from './styles.module.css';

export function HomePage () {

  const { uid, users } = useContext(SocketContext).SocketState


  return (
    <div className={styles.home_page_container}>
      <ShootingStar />
      <SelectMatchContainer />
      <RecentEventsFeed />
      {/* <MatchButton />
      <h2>Socket IO Information</h2>
      <div>Your user ID: {uid}</div>
      <div>Users Online: {users.length}</div> */}
    </div>
  )
}