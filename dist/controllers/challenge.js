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
exports.getRecentChallenges = exports.getChallengeById = exports.createChallenge = void 0;
const Challenge_1 = require("../models/Challenge");
const User_1 = require("../models/User");
const createChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { winnerId, loserId, questionId, tie } = req.body.challenge;
        const challenge = yield Challenge_1.Challenge.create({ tie, winnerId, loserId, questionId });
        const winner = yield User_1.User.findOne({ where: { uid: winnerId } });
        const loser = yield User_1.User.findOne({ where: { uid: winnerId } });
        // winner?.addChallenge(challenge);
        // loser?.addChallenge(challenge);
        res.status(201).send({ error: false, res: challenge });
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'error creating new Challenge' });
    }
});
exports.createChallenge = createChallenge;
const getChallengeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const challenge = yield Challenge_1.Challenge.findByPk(id);
        if (challenge) {
            res.status(200).send({ error: false, res: challenge });
        }
        else {
            res.status(404).send({ error: true, res: 'Challenge Does Not Exist' });
        }
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Getting Challenge' });
    }
});
exports.getChallengeById = getChallengeById;
const getRecentChallenges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const challenges = yield Challenge_1.Challenge.findAll({ limit: 10, order: [['updatedAt', 'DESC']] });
        res.status(200).send(challenges);
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Getting Recent Challenges' });
    }
});
exports.getRecentChallenges = getRecentChallenges;
