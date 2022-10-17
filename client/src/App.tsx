import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

//redux imports
import { useSelector, Provider as ReduxProvider } from "react-redux";
import store from "./state/store";
import { useDispatch } from "react-redux";
import { updateUser } from "./state/actions/user";
import { updateLogged } from "./state/actions/status";
import SocketContext from "./contexts/Context";
import { updateMatch } from "./state/actions/match";

//component imports
import NavBar from "./components/Navbar/index";
import { Popup } from "./components/views/BattlePage/Popup/index";

//services imports
import { getUserById } from "./services/userServices";

function App() {
  const [ trigger, setTrigger ] = useState(false);
  const currentUid = useSelector((state: any) => state.currentUser.uid);
  const [ thisUid, setThisUid ] = useState('');
  const { socket } = useContext(SocketContext).SocketState;
  const [ enemyUsername, setEnemyUserName ] = useState('');
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  socket?.connect();

  useEffect(() => {
    if (currentUid) {
      socket?.on("friendly_match", async (player1uid, player2uid, roomId) => {
        const enemy = await getUserById(player1uid);
        setEnemyUserName(enemy.res.username)
        dispatch(
          updateMatch({
            player1: player1uid,
            player2: player2uid,
            matchFound: false,
            winner: "",
            loser: "",
            roomId,
          })
        );
        console.log(user?.sub !== player1uid)
        console.log(user?.sub, player1uid);
        if (currentUid !== player1uid) {
          setTrigger(true);
        }
        else {
          console.log('we are the sender')
        }
      })
    }
    console.log(currentUid)
  }, [currentUid])

  useEffect(() => {
    socket?.on("match_found", (player1uid, player2uid, roomId) => {
      console.log(player1uid, player2uid);
      dispatch(
        updateMatch({
          player1: player1uid,
          player2: player2uid,
          matchFound: true,
          winner: "",
          loser: "",
          roomId,
        })
      );
      navigate("/battle");
    });
    socket?.on("accepted", () => {
      navigate("/battle");
      setTrigger(false);
    })
    socket?.on("declined", () => {
      setTrigger(false);
    })
  }, [])


  useEffect(() => {
    (async () => {
      try {
        if (user && user.sub && user.picture) {
          const clientUser = await getUserById(user?.sub);
          console.log(clientUser);
          if (clientUser.error === true) {
            navigate("/username");
          } else {
            dispatch(updateLogged(true));
            dispatch(updateUser(clientUser.res));
            console.log(clientUser.res.uid, 'uid')
            setThisUid(clientUser.res.uid)
          }
        } else {
          dispatch(updateLogged(false));
        }
      } catch (error) {
        dispatch(updateLogged(false));
      }
    })();
  }, [user]);

  return (
    <ReduxProvider store={store}>
      <div className="navbar-outer-container">
        <NavBar />
        {trigger && <Popup isRanked={false} enemyUser={enemyUsername}/>}
      </div>
    </ReduxProvider>
  );
}

export default App;