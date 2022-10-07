import { Server as HTTPServer} from 'http';
import { Socket, Server} from 'socket.io';
import { Inqueue } from './models/Inqueue';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: string }

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      cors: {
        origin: '*'
      }
    })

    this.io.on('connect', this.StartListeners)

    console.info('Socket IO started.')
  }

  StartListeners = (socket: Socket) => {
    console.info('Message Received from ' + socket.id);

    socket.on('handshake', (callback: (uid: string, users: string[]) => void) => {
      console.info('Handshake received from ' + socket.id);

      const reconnected = Object.values(this.users).includes(socket.id);

      if (reconnected) {
        console.log('this user has reconnected');

        const uid = this.GetUidFromSocketId(socket.id);
        const users = Object.values(this.users);

        if (uid) {
          console.log('Sending callback for reconnect ...');
          callback(uid, users);
          return;
        }
      }

      const uid = JSON.stringify(Math.floor(Math.random() * 100000));
      this.users[uid] = socket.id;
      const users = Object.values(this.users);

      console.log('Sending callback for handshake');
      callback(uid, users);

      this.SendMessage(
        'user_connected',
        users.filter(id => id !== socket.id),
        users
      )


    })

    socket.on('queue_user', async (uid: string) => {
      console.log('queued user.')
      const queued = await Inqueue.findAll();
      if (queued.length >= 1) {
        console.log('should not create room.')
        socket.join(queued[0].roomId)
        this.io.to(queued[0].roomId).emit('match_found')
      }

      else {
        const room = JSON.stringify(Math.floor(Math.random() * 1000));
        socket.join(room);
        await Inqueue.create({uid: JSON.stringify(Math.floor(Math.random() * 100000)), roomId: room})
      }

      

    })

    socket.on('disconnect', () => {
      console.info('Disconnect received from ' + socket.id);

      const uid = this.GetUidFromSocketId(socket.id);

      if (uid) {
        delete this.users[uid];
        const users = Object.values(this.users);
        this.SendMessage('user_disconnected', users, uid);
      }
    })
  }

  GetUidFromSocketId = (id: string) => Object.keys(this.users).find((uid) => this.users[uid] === id);
  
  SendMessage = (name: string, users: string[], payload?: Object) => {
    console.log('emmitting event: ' + name + ' to ' + users);
    users.forEach(id => payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name));
  }
}

