import { IMessage } from '../../../../types'
import { MessageCard } from '../MessageCard'

import styles from './styles.module.css';

interface IProps {
  mail : IMessage[]
} 

export const MailBox = ({mail} :IProps) => {
  return (
    <div id = {styles.mail_container}>
      {mail ? mail.map(message => <MessageCard message = {message} />) : 
      <h1>No User Mail</h1>}
    </div>
  )

}