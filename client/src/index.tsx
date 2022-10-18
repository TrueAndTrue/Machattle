import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme } from "./themeProvider";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import SocketContextComponent from "./contexts/Component";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { BattlePage } from "./components/views/BattlePage";
import { HomePage } from "./components/views/HomePage";
import { LeaderboardPage } from "./components/views/LeaderboardPage";
import { ProfilePage } from "./components/views/ProfilePage";
import { QueuePage } from "./components/views/QueuePage";
import { LandingPage } from "./components/views/LandingPage";
import { Provider as ReduxProvider } from "react-redux";
import { Messages } from './components/views/Messages'
import { MessageBody } from "./components/views/Messages/MessageBody";
import { MessageForm } from "./components/views/Messages/MessageForm";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store} from "./state/store";
import { PopUp } from "./components/views/PopUp";

const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";
console.log(domain, clientId);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PersistGate loading={null} persistor={persistor}>
  <ReduxProvider store={store}>
    <SocketContextComponent>
      <BrowserRouter>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
        >
          <ThemeProvider theme={theme}>
            <App />
            <section className="views-container">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/username" element={<PopUp />} />
                <Route path="/battle" element={<BattlePage />} />
                <Route path="/queue" element={<QueuePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:id" element={<MessageBody />} />
              </Routes>
            </section>
          </ThemeProvider>
        </Auth0Provider>
      </BrowserRouter>
    </SocketContextComponent>
  </ReduxProvider>
  </PersistGate>
);
