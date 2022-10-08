"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSocket = void 0;
const socket_io_1 = require("socket.io");
const Inqueue_1 = require("./models/Inqueue");
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
                this.SendMessage('user_connected', users.filter((id) => id !== socket.id), users);
            });
            socket.on('queue_user', (uid) => __awaiter(this, void 0, void 0, function* () {
                console.log(uid);
                console.log('queued user.');
                const queued = yield Inqueue_1.Inqueue.findAll();
                if (queued.length >= 1) {
                    console.log('should not create room.');
                    socket.join(queued[0].roomId);
                    this.io.to(queued[0].roomId).emit('match_found');
                    const count = yield Inqueue_1.Inqueue.destroy({ where: { uid: uid } });
                    const count2 = yield Inqueue_1.Inqueue.destroy({ where: { uid: queued[0].uid } });
                    console.log(count + count2);
                }
                else {
                    const room = JSON.stringify(Math.floor(Math.random() * 1000));
                    socket.join(room);
                    yield Inqueue_1.Inqueue.create({ uid: uid, roomId: room });
                }
            }));
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
            pingInterval: 10000,
            pingTimeout: 5000,
            cors: {
                origin: '*'
            }
        });
        this.io.on('connect', this.StartListeners);
        console.info('Socket IO started.');
    }
}
exports.ServerSocket = ServerSocket;
