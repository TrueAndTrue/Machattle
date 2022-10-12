import { useParams } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';

import { RecentEventsFeed } from '../HomePage/RecentEventsFeed';
import { AvatarContainer } from './AvatarContainer/index';
import { FriendsList } from './FriendsList';
import { MatchHistory } from './MatchHistory';
import { ProfileInfoContainer } from './ProfileInfoContainer';
import { IUser } from '../../../types';
import { getUserByUsername } from '../../../services/userServices';
import styles from './styles.module.css';

interface IContext {
  user : IUser
}

const initialUser : IUser = {username :'', rating : 0, rank: '', image :'' , friends :[]}
export const UserContext = createContext<IContext>({user :initialUser});

interface IProps  {
  username : string | undefined
}

export function ProfilePage () {
  const { username } = useParams() 
  const [user, setUser] = useState<IUser>(initialUser)

  useEffect(() => {
    getUser();
  }, [username])

  const getUser = async () => {
    if(username) {
      const newUser = await getUserByUsername(username);
      newUser && setUser(newUser)
    }
  }

  return (
    <UserContext.Provider value = {{ user }}>
    <div className={styles.profile_page_container}>
      <div className={styles.profile_left}>
        <ProfileInfoContainer />
        <FriendsList />
      </div>
      <RecentEventsFeed />
    </div>
    </UserContext.Provider>
  )
}