import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { Inqueue } from "./models/Inqueue";

export class ServerSocket {
  public ranks: string[];
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: string };

  public uid: string

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.uid = '';
    this.ranks = ['Bronze 4', 'Bronze 3', 'Bronze 2', 'Bronze 1', 'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1', 'Gold 4', 'Gold 3', 'Gold 2', 'Gold 1', 'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond 4', 'Diamond 3', 'Diamond 2', 'Diamond 1', 'Palladium 4', 'Palladium 3', 'Palladium 2', 'Palladium 1'];
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cors: {
        origin: "*",
      },
    });

    this.io.on("connect", this.StartListeners);

    console.info("Socket IO started.");
  }

  
  StartListeners = (socket: Socket) => {

    //queue handler
    const queueLogic = async (uid: string, rank: string[], allowedDifference: number, roomId: string) => {
      if (!this.uid || allowedDifference > 18) {
        console.log(this.uid, 'NO UID.')
        await Inqueue.destroy({ where: { uid } });
        socket.leave(roomId)
        return 'destroy';
      };
      const queued = await Inqueue.findAll();
      // console.log(queued, "queued")
      let matchFound = false;
      let matchPlayers: string[] = [];
      if (queued.length === 0) {
        console.log('queue length was 0')
        return 'destroy';
      }
      queued.forEach((queue) => { 
        if (queue.uid === uid) {
          console.log('yourself')
        }
        else {
          console.log('got in the else', uid)
          let userIndex = 0;
          let opponentIndex = 0;
          this.ranks.find((currRank, i) => {
            if (currRank === rank[0]) {
              userIndex = i;
            }
            else if (currRank === queue.rank[0]) {
              opponentIndex = i;
            }
          let difference = userIndex - opponentIndex;
          if (difference < 0) {
            difference = difference / -1
          }
          if (difference <= allowedDifference) {
            socket.join(queue.roomId);
            this.io
              .to(queue.roomId)
              .emit("match_found", queue.uid, uid, queue.roomId);
            matchFound = true;
            matchPlayers.push(uid, queue.uid);
            return;
          }
          });      
        }
      });
      if (matchFound) {
        await Inqueue.destroy({ where: { uid: matchPlayers[0] } })
        await Inqueue.destroy({ where: { uid: matchPlayers[1] } })
        return true;
      }
    }



    console.info("Message Received from " + socket.id);

    socket.on("send_uid", (uid: string) => {
      if (uid) {
        this.uid = uid;
        console.log(this.uid, 'THIS.UID')
      }
    })

    socket.on(
      "handshake",
      (callback: (uid: string, users: string[]) => void) => {
        console.info("Handshake received from " + socket.id);
        const reconnected = Object.values(this.users).includes(socket.id);

        if (reconnected) {
          console.log("this user has reconnected");

          const uid = this.uid
          console.log(uid, 'inside handshaek')
          const users = Object.values(this.users);

          if (uid) {
            console.log("Sending callback for reconnect ...");
            callback(uid, users);
            return;
          }
        }

        const uid = this.uid
        console.log(uid, 'also in hadnskae')
        this.users[uid] = socket.id;
        const users = Object.values(this.users);

        console.log("Sending callback for handshake");
        callback(uid, users);

        this.SendMessage(
          "user_connected",
          users.filter((id) => id !== socket.id),
          users
        );
      }
    );

    socket.on("player_won", async (winnerUid: string, roomId: string) => {
      console.log(winnerUid, roomId, "IN PLAYER WON");
      this.io.to(roomId).emit("winner", winnerUid);
      console.log('after emit')
      socket.leave(roomId);
    });

    socket.on("queue_user", async (uid: string, rank: string[]) => {
      if (uid == '0') {
        console.log('UID WAS 0');
        return;
      } 
      let isFound: string | boolean | undefined;
      console.log(uid);
      console.log("queued user.");
      const queueUsers = await Inqueue.findAll();
      const queueUids = queueUsers.map((queued) => queued.uid);
      console.log(queueUids)
      if (queueUids.includes(uid)) {
        return;
      }
      let allowedDifference = 4;
      const room = JSON.stringify(Math.floor(Math.random() * 10000));
      socket.join(room);
      await Inqueue.create({ uid: uid, roomId: room, rank });
      console.log('created user')
      queueLogic(uid, rank, allowedDifference, room);
      
      const queuing = setInterval(async () => {
        isFound = await queueLogic(uid, rank, allowedDifference, room);
        if (isFound) {
          clearInterval(queuing);
          return;
        }
        else if (isFound === 'destroy') {
          clearInterval(queuing);
          return;
        }
        else {
          allowedDifference++;
        }
        allowedDifference++
      }, 2000)


      return;

    });

    socket.on("disconnect", async () => {
      console.info("Disconnect received from " + socket.id);

      const uid = this.uid;
      console.log(uid, 'IN DISCONNECT');

      if (uid) {
        await Inqueue.destroy({ where: { uid: uid }});
        delete this.users[uid];
        const users = Object.values(this.users);
        this.SendMessage("user_disconnected", users, uid);
      }
      socket.removeAllListeners();
    });
  };

  GetUidFromSocketId = (id: string) =>
    Object.keys(this.users).find((uid) => this.users[uid] === id);

  SendMessage = (name: string, users: string[], payload?: Object) => {
    console.info("emmitting event: " + name + " to " + users);
    users.forEach((id) =>
      payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)
    );
  };
}
