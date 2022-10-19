import { useParams } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';


import { IChallenge } from '../../../types';
import { getUserChallenges } from '../../../services/userServices';
import { RecentEventsFeed } from '../HomePage/RecentEventsFeed';
import { FriendsList } from './FriendsList';
import { ProfileInfoContainer } from './ProfileInfoContainer';
import { IUser } from '../../../types';
import { getUserByUsername } from '../../../services/userServices';
import styles from './styles.module.css';
import { ShootingStar } from '../QueuePage/ShootingStar';

interface IContext {
  user : IUser
}

const initialUser : IUser = {username :'', rating : 0, rank: ['', ''], image :'' , friends :[], uid:'', challenges:[]}
export const UserContext = createContext<IContext>({user :initialUser});

export function ProfilePage () {
  const { username } = useParams()
  const [user, setUser] = useState<IUser>(initialUser)
  const [challenges, setChallenges] = useState<IChallenge[]>([])


  useEffect(() => {
    getUser();
    getChallenges()
  }, [username])

  const getChallenges = async () => {
    const userChallenges = await getUserChallenges(username!)
    setChallenges(userChallenges)
  }

  const getUser = async () => {
    if(username) {
      const newUser = await getUserByUsername(username);
      newUser && setUser(newUser)
    }
  }

  return (
    <UserContext.Provider value = {{ user }}>
    <div className={styles.profile_page_container}>
      <ShootingStar />
      <div className={styles.profile_left}>
        <ProfileInfoContainer />
        <div className={styles.profile_btm_left}>
          <FriendsList /> 
        </div>
      </div>
      <RecentEventsFeed recentEvents = {challenges}/>
    </div>
    </UserContext.Provider>
  )
}