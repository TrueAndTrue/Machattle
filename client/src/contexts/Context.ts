import React, { createContext } from "react";
import { Socket } from "socket.io-client";


export interface ISocketContextState {
  socket: Socket | undefined;
  uid: string;
  users: string[];
  inQueue: string[];
}

export const defaultSocketContextState = {
  socket: undefined,
  uid: '',
  users: [],
  inQueue: [],
}

export type TSocketContextActions = 'update_socket' | 'update_uid' | 'update_users' | 'remove_user' | 'queue_user';

export type TSocketContextPayload = string | string[] | Socket | boolean;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload
}

export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
  console.log(`Message Received - Action: ${action.type} - Payload: ${action.payload}`);
  console.log(state.users);
  console.log(state.inQueue);

  switch(action.type) {
    case 'update_socket':
      return {...state, socket: action.payload as Socket}
    case 'update_uid':
      return {...state, uid: action.payload as string}
    case 'update_users':
      return {...state, users: action.payload as string[]}
    case 'remove_user':
      return {...state, users: state.users.filter((uid) => uid !== (action.payload as string))}
    case 'queue_user':
      return {
        ...state, 
        inQueue: [...state.inQueue, action.payload as string]}
    default:
      return {...state}
  }
}

export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {}
})

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;