<<<<<<< HEAD
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
exports.addExercise = exports.addFriend = exports.getUserById = exports.getUserByUsername = exports.addUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const Question_1 = require("../models/Question");
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
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { uid, friendUID } = req.body;
        const user = yield User_1.User.findOne({
            where: { uid },
            include: {
                model: User_1.User, as: 'friends',
                attributes: ['uid'],
                through: {
                    attributes: []
                }
            }
        });
        const friend = yield User_1.User.findOne({ where: { uid: friendUID } });
        if (user && friend) {
            const hasFriend = (_a = user.getDataValue('friends')) === null || _a === void 0 ? void 0 : _a.filter(user => {
                return friendUID === user.uid;
            }).length;
            if (!hasFriend) {
                user.addFriend(friend);
                res.status(200).send({ message: 'friend added successfully' });
            }
            else
                res.status(409).send({ error: true, res: "Error, User Already Has Friend" });
        }
        else {
            res.status(404).send('User Does Not Exist');
        }
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Adding Friend' });
    }
});
exports.addFriend = addFriend;
const addExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { uid, questionId } = req.body;
        const user = yield User_1.User.findOne({
            where: { uid },
            include: {
                model: Question_1.Question,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }
        });
        const question = yield Question_1.Question.findOne({ where: { id: questionId } });
        if (user && question) {
            const completedQuestion = (_b = user.getDataValue('Questions')) === null || _b === void 0 ? void 0 : _b.filter(question => {
                return questionId === question.id;
            }).length;
            if (!completedQuestion) {
                user.addQuestion(question);
                res.status(200).send({ error: false, res: "Exercise Added To Completed Exercises" });
            }
            else
                res.status(409).send({ error: true, res: "Error, User Has Already Completed Exercise" });
        }
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Adding To Completed Exercises' });
    }
});
exports.addExercise = addExercise;
=======
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
exports.addExercise = exports.addFriend = exports.getUserById = exports.getUserByUsername = exports.addUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const Question_1 = require("../models/Question");
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
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { uid, friendUID } = req.body;
        const user = yield User_1.User.findOne({
            where: { uid },
            include: { model: User_1.User, as: 'friends' }
        });
        const friend = yield User_1.User.findOne({ where: { uid: friendUID } });
        if (user && friend) {
            const hasFriend = (_a = user.getDataValue('friends')) === null || _a === void 0 ? void 0 : _a.filter(user => {
                return friendUID === user.uid;
            }).length;
            if (!hasFriend) {
                user.addFriend(friend);
                res.status(200).send({ error: false, res: 'Friend added successfully' });
            }
            else
                res.status(409).send({ error: true, res: "Error, User Already Has Friend" });
        }
        else {
            res.status(404).send('User Does Not Exist');
        }
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Adding Friend' });
    }
});
exports.addFriend = addFriend;
const addExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { uid, questionId } = req.body;
        const user = yield User_1.User.findOne({
            where: { uid },
            include: {
                model: Question_1.Question,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }
        });
        const question = yield Question_1.Question.findOne({ where: { id: questionId } });
        if (user && question) {
            const completedQuestion = (_b = user.getDataValue('Questions')) === null || _b === void 0 ? void 0 : _b.filter(question => {
                return questionId === question.id;
            }).length;
            if (!completedQuestion) {
                user.addQuestion(question);
                res.status(200).send({ error: false, res: "Exercise Added To Completed Exercises" });
            }
            else
                res.status(409).send({ error: true, res: "Error, User Has Already Completed Exercise" });
        }
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Adding To Completed Exercises' });
    }
});
exports.addExercise = addExercise;
>>>>>>> 31d6236fed495308b79282841743ea4ab213cfb3
