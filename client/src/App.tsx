import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './styles.module.css';

//redux imports
import { Provider as ReduxProvider } from 'react-redux';
import store from './state/store';

//component imports
import NavBar from './components/Navbar/index'
import { BattlePage } from './components/views/BattlePage';
import { HomePage } from './components/views/HomePage';
import { LeaderboardPage } from './components/views/LeaderboardPage';
import { ProfilePage } from './components/views/ProfilePage';
import { QueuePage } from './components/views/QueuePage';

function App() {

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <div className='navbar-outer-container'>
          <NavBar />
        </div>
        <section className='views-container'>
          <Routes>
            <Route path='/home' element={<HomePage />}/>
            <Route path='/profile' element={<ProfilePage />}/>
            <Route path='/battle' element={<BattlePage />}/>
            <Route path='/queue' element={<QueuePage />} />
            <Route path='/leaderboard' element={<LeaderboardPage />} />
          </Routes>
        </section>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
