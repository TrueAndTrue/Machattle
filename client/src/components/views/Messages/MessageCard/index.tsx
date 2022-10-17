import { Link } from 'react-router-dom'
import moment from 'moment'

import { IMessage } from '../../../../types'
import styles from './styles.module.css';

interface IProps {
  message : IMessage
} 

export const MessageCard = ({ message } :IProps) => {

  const {senderUsername, title, createdAt} = message;
  const messageId = message.id
  const timeAgo = moment(createdAt).fromNow()

  return (
    <Link className ={styles.message_card} to ={`${messageId}`} ><p>Sent By {senderUsername} </p> <p> {title} </p><p> {timeAgo} </p></Link>
  )
}