import { useSelector } from "react-redux";

export const MailBox = () => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const userMail = [];
}