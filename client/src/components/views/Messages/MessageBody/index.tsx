import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import { Button } from '@mui/material'
import moment from 'moment'

import { getMailById } from '../../../../services/mailService'
import { IMessage } from '../../../../types'
import { OptionsBar } from '../OptionsBar'

import styles from './styles.module.css'

const initialMessage :IMessage= {id: -1, title :"",content:"", senderUsername:"", receiverUsername:"",createdAt: new Date(), read:false }

export const MessageBody = () => {
  const {id} = useParams();
  const [mail, setMail] = useState<IMessage>(initialMessage)
  const {title, content, senderUsername, createdAt} = mail  
  const timeAgo = moment(createdAt).fromNow(); 
  useEffect(() => {
    getMail();
  },[])

  const getMail = async () => {
    if(id){
      const message = await getMailById(parseInt(id));
      setMail(message)
    }
  }
 
  return(<div id = {styles.message_body_container}>
    <OptionsBar />
    <div id = {styles.message_content}>
      <h2>{title}</h2>
      <div id = {styles.second_header}><h4> from {senderUsername}</h4><h4>sent {timeAgo}</h4></div>
      <div id = {styles.content}>{content}</div>
      <Button id = {styles.reply}>Reply</Button>
    </div>
  </div>)
}