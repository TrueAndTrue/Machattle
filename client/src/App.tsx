import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//redux imports
import { Provider as ReduxProvider } from 'react-redux';
import store from './state/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './state/actions/user';
import { updateLogged } from './state/actions/status';
import SocketContext, { SocketReducer } from './contexts/Context';
import { defaultSocketContextState } from './contexts/Context';
import { updateMatch } from './state/actions/match';

//component imports
import NavBar from './components/Navbar/index'
import { PopUp } from './components/views/PopUp';

//services imports 
import { getUserById, addUser } from './services/userServices';

function App() {

  const { socket, users, inQueue } = useContext(SocketContext).SocketState
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  socket?.connect();

  socket?.on('match_found', (player1uid, player2uid, roomId) => {
    console.log(player1uid, player2uid)
    dispatch(updateMatch({
      player1: player1uid,
      player2: player2uid,
      matchFound: true,
      winner: '',
      loser: '',
      roomId
    }));
    navigate('/battle');
  })

  useEffect(() => {
    (async () => {
      try {
        if (user && user.sub && user.picture) {
          const clientUser = await getUserById(user?.sub)
          console.log(clientUser);
          if (clientUser.error === true) {
            navigate('/username')
          }
          else {
            dispatch(updateLogged(true));
            console.log(clientUser.res);
            dispatch(updateUser(clientUser.res));
          }
        }
        else {
          dispatch(updateLogged(false));
        }
      }
      catch (error) {
        dispatch(updateLogged(false));
      }
    })()
  }, [user])

  return (
    <ReduxProvider store={store}>
      <div className='navbar-outer-container'>
        <NavBar />
      </div>
    </ReduxProvider>
  );
}

export default App;
