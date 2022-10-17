import { IMessage } from '../../../../types'
import { MessageCard } from '../MessageCard'
interface IProps {
  mail : IMessage[]
} 

export const MailBox = ({mail} :IProps) => {

  return (
    <div>
      {mail.map(message => <MessageCard title = {message.title} />)}
    </div>
  )

}