import { useState, FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { sendMessage } from '../../../../services/mailService'

import styles from './styles.module.css'

export const MessageForm = () => {
  const { username } = useSelector((state: any) => state.currentUser);
  const [recipient, setRecipient] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onSubmit = async (e : FormEvent<HTMLFormElement>) =>  {
    const newMessage = {title,content, receiverUsername : recipient, senderUsername : username}
    await sendMessage(newMessage)
  }

  interface TargetWithReset extends EventTarget{
    reset : Function
  }

  return (<form
  id ={styles.message_form}
  onSubmit={(e) => {
    e.preventDefault();
    const eventTarget  = e.target as TargetWithReset 
    eventTarget.reset()
    onSubmit(e);
  }}>
    <label>
      To
      <input type="text" name="recipient" onChange={(e) => setRecipient(e.target.value)} />
    </label>
    <label>
      Title
      <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
    </label>
    <textarea id = {styles.text} onChange={(e) => setContent(e.target.value)}>
    </textarea>
    <input type="submit" value="Submit" />
  </form>)

}