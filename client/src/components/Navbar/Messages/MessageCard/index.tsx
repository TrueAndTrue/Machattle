import { Link } from 'react-router-dom'

interface IProps {
  title :string
} 

export const MessageCard = ({ title } :IProps) => {

  return (
    <Link to ={'message/:id'}>{title}</Link>
  )
}