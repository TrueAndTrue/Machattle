import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './Context';

export interface ISocketContextComponentProps extends PropsWithChildren{}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {

  const { children } = props;

  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
  const [loading, setLoading] = useState(true);
  const serverPort =  process.env.REACT_APP_SERVER_PORT || '/';
  
  const socket = useSocket(serverPort, {

    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false
  })


  useEffect(() => {

    socket.connect();

    SocketDispatch({ type: 'update_socket', payload: socket})

    StartListeners();

    SendHandShake();
  }, [])

  const StartListeners = () => {
    socket.on('user_connected', (users: string[]) => {
      console.log('user connected. new user list received');
      console.log(users)
      SocketDispatch({ type: 'update_users', payload: users});
    })

    socket.on('user_disconnected', (uid: string[]) => {
      console.log('user disconnected.');
      SocketDispatch({ type: 'remove_user', payload: uid});
      console.log('after')
    })

    socket.io.on('reconnect', (attempt) => {
      console.log('Reconnected on attempt: ' + attempt)
    })

    socket.io.on('reconnect_failed', () => {
      console.log('Unable to connect to socket')
    })
  }

  const SendHandShake = () => {
    console.log('sending handshake to server...')

    socket.emit('handshake', (uid: string, users: string[]) => {
      console.log('user handshake callback message received');
      SocketDispatch({type: 'update_uid', payload: uid});
      SocketDispatch({type: 'update_users', payload: users});

      setLoading(false);
    })
  }

  if (loading) return <p>loading socket...</p>

  return <SocketContextProvider value={{SocketState, SocketDispatch}}>
    {children}
</SocketContextProvider>
}

export default SocketContextComponent;