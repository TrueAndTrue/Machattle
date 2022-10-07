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
exports.addUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.findAll();
        res.status(200).send(users);
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'error getting exercises' });
    }
});
exports.getAllUsers = getAllUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield User_1.User.create(req.body.user);
        res.status(201).send({ user: response });
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'error creating new Exercise' });
    }
});
exports.addUser = addUser;
