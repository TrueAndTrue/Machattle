import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

//redux imports
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./state/store";
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
  const [trigger, setTrigger] = useState(false);
  const [thisUid, setThisUid] = useState("");
  const { socket } = useContext(SocketContext).SocketState;
  const [enemyUsername] = useState("");
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  socket?.connect();

  useEffect(() => {
    socket?.on("match_found", (player1uid, player2uid, roomId) => {
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
    });
    socket?.on("declined", () => {
      setTrigger(false);
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user && user.sub && user.picture) {
          const clientUser = await getUserById(user?.sub);
          if (clientUser.error === true) {
            navigate("/username");
          } else {
            dispatch(updateLogged(true));
            dispatch(updateUser(clientUser.res));
            setThisUid(clientUser.res.uid);
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
      <PersistGate loading={null} persistor={persistor}>
        <div className="navbar-outer-container">
          <NavBar />
          {trigger && (
            <Popup
              isRanked={false}
              enemyUser={enemyUsername}
              isPractice={false}
            />
          )}
        </div>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
