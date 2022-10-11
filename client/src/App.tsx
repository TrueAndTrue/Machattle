import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//redux imports
import { Provider as ReduxProvider } from 'react-redux';
import store from './state/store';
import { useDispatch } from 'react-redux';
import { updateUser } from './state/actions/user';
import { updateLogged } from './state/actions/status';

//component imports
import NavBar from './components/Navbar/index'

//services imports 
import { getUserById, addUser } from './services/userServices';

function App() {

  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (user && user.sub && user.picture) {
          const clientUser = await getUserById(user?.sub)
          console.log(clientUser);
          if (clientUser.error === true) {
            const newUser = await addUser(user.sub, 'Hello', user.picture)
            dispatch(updateUser(newUser))
          }
          else {
            dispatch(updateLogged(true));
            dispatch(updateUser(clientUser.res))
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
