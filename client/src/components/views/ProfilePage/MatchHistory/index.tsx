import { useContext, useEffect,useState } from 'react';

import { IChallenge } from '../../../../types';
import { getUserChallenges } from '../../../../services/userServices';
import { MatchCard } from '../MatchCard';
import { UserContext } from '..';

import styles from './styles.module.css';

export function MatchHistory () {
  const user = useContext(UserContext).user
  const [challenges, setChallenges] = useState<IChallenge[]>([])

  useEffect(()=> {
    getChallenges()
  },[])

  const getChallenges = async () => {
    const userChallenges = await getUserChallenges(user.uid)
    setChallenges(userChallenges)
  }

  return (
    <div className={styles.match_history_container}>
      <h1>Match History</h1>
      {challenges.map(challenge => <MatchCard match={challenge}/>)}
    </div>
  )
}