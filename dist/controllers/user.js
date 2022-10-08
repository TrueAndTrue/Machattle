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
exports.getUserById = exports.getUserByUsername = exports.addUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.findAll();
        res.status(200).send(users);
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Getting Exercises' });
    }
});
exports.getAllUsers = getAllUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body.user;
        const userExists = yield User_1.User.findOne({ where: { username: newUser.username } });
        if (!userExists) {
            const user = yield User_1.User.create(newUser);
            res.status(201).send({ user });
        }
        else {
            res.status(409).send({ message: 'Username Already Exists!' });
        }
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Creating New User' });
    }
});
exports.addUser = addUser;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body.user;
        const user = yield User_1.User.findOne({ where: { username } });
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send('User Does Not Exist');
        }
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Getting User' });
    }
});
exports.getUserByUsername = getUserByUsername;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = yield User_1.User.findOne({ where: { uid } });
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send('User Does Not Exist');
        }
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Getting User' });
    }
});
exports.getUserById = getUserById;
