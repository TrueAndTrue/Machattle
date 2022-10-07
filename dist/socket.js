"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSocket = void 0;
const socket_io_1 = require("socket.io");
class ServerSocket {
    constructor(server) {
        this.StartListeners = (socket) => {
            console.info('Message Received from ' + socket.id);
            socket.on('handshake', (callback) => {
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
                this.SendMessage('user_connected', users.filter(id => id !== socket.id), users);
            });
            socket.on('disconnect', () => {
                console.info('Disconnect received from ' + socket.id);
                const uid = this.GetUidFromSocketId(socket.id);
                if (uid) {
                    delete this.users[uid];
                    const users = Object.values(this.users);
                    this.SendMessage('user_disconnected', users, uid);
                }
            });
        };
        this.GetUidFromSocketId = (id) => Object.keys(this.users).find((uid) => this.users[uid] === id);
        this.SendMessage = (name, users, payload) => {
            console.log('emmitting event: ' + name + ' to ' + users);
            users.forEach(id => payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name));
        };
        ServerSocket.instance = this;
        this.users = {};
        this.io = new socket_io_1.Server(server, {
            serveClient: false,
            cors: {
                origin: '*'
            }
        });
        this.io.on('connect', this.StartListeners);
        console.info('Socket IO started.');
    }
}
exports.ServerSocket = ServerSocket;
