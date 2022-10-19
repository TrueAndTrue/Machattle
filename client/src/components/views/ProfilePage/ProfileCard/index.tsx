import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import SocketContext from "../../../../contexts/Context";

import {
  addUserFriends,
  removeUserFriends,
} from "../../../../state/actions/user";
import { UserContext } from "..";
import { ProfileUpdateForm } from "../ProfileUpdateForm";
import { IUser } from "../../../../types";
import {
  addFriend,
  removeFriend,
} from "../../../../services/userServices";
import styles from "./styles.module.css";

//shield imports due to compilation issues
import Bronze from "../../../../assets/ranks/1.png";
import Silver from "../../../../assets/ranks/2.png";
import Gold from "../../../../assets/ranks/3.png";
import Platinum from "../../../../assets/ranks/4.png";
import Diamond from "../../../../assets/ranks/5.png";
import Palladium from "../../../../assets/ranks/6.png";
import LinearProgress from "@mui/material/LinearProgress";

const imgLocations: string[] = [];

export function ProfileCard() {
  const currentUser = useSelector((state: any) => state.currentUser);
  const otherProfile = useContext(UserContext).user;
  const [update, setUpdate] = useState(false);
  const { socket } = useContext(SocketContext).SocketState;
  const dispatch = useDispatch();
  socket?.connect();

  for (let i = 1; i <= 6; i++) {
    imgLocations.push(`ranks/${i}.png`);
  }

  const [rankImage, setRankImage] = useState("");

  useEffect(() => {
    if (otherProfile.rank) {
      const rankStr = otherProfile.rank[0].split(" ")[0];

      if (rankStr === "Bronze") {
        setRankImage(Bronze);
      } else if (rankStr === "Silver") {
        setRankImage(Silver);
      } else if (rankStr === "Gold") {
        setRankImage(Gold);
      } else if (rankStr === "Platinum") {
        setRankImage(Platinum);
      } else if (rankStr === "Diamond") {
        setRankImage(Diamond);
      } else if (rankStr === "Pallidium") {
        setRankImage(Palladium);
      }
    }
  }, [currentUser, otherProfile]);

  const isUserProfile = currentUser.uid == otherProfile.uid;
  const isFriend =
    currentUser.friends.filter(
      (friend: IUser) => friend.uid === otherProfile.uid
    ).length > 0;

  const updateProfile = () => {
    setUpdate(!update);
  };

  const addFriendToUser = async () => {
    await addFriend(currentUser.uid, otherProfile.uid);
    dispatch(addUserFriends(currentUser, otherProfile));
  };

  const removeUserFriend = async () => {
    await removeFriend(currentUser.uid, otherProfile.uid);
    dispatch(removeUserFriends(currentUser, otherProfile));
  };

  return (
    <div className={styles.profile_card_container}>
      <div className={styles.profile_info}>
        <div className={styles.profile_username}>
          <h2 className={styles.user_text}>
            {otherProfile.username || "Username"}
          </h2>
          <h2 className={styles.friend_text}>
            Friends Online: {otherProfile.friends?.length}
          </h2>
        </div>
        <div className={styles.avatar_container}>
          <div
            id={styles.profile_img}
            style={{ backgroundImage: `url(${otherProfile.image})` }}
          />
          <div id={styles.button_container}>
            {isUserProfile && (
              <Button id={styles.update_profile} onClick={updateProfile}>
                Change Avatar
              </Button>
            )}
            {!isUserProfile && !isFriend && (
              <Button id={styles.add_friend} onClick={addFriendToUser}>
                Add Friend
              </Button>
            )}
            {!isUserProfile && isFriend && (
              <Button id={styles.add_friend} onClick={removeUserFriend}>
                Remove Friend
              </Button>
            )}
          </div>
          {update && <ProfileUpdateForm updateProfile={updateProfile} />}
        </div>
        <div className={styles.profile_rank}>
          <img className={styles.ranked_logo} src={rankImage} alt="rank icon" />
          <p className={styles.ranked_text}>
            {otherProfile.rank[0] || "Unranked"}
          </p>
          <p className={styles.ranked_text}>
            {otherProfile.rank[1] + "MP" || "Unranked"}
          </p>
          <LinearProgress
            sx={{ backgroundColor: "black" }}
            className={styles.prog}
            variant="determinate"
            value={parseInt(otherProfile.rank[1])}
          />
        </div>
      </div>
    </div>
  );
}
