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
exports.addUser = exports.addExercise = exports.getExerciseById = exports.getAllExercises = void 0;
const Question_1 = require("../models/Question");
const Inqueue_1 = require("../models/Inqueue");
const getAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield Question_1.Question.findAll();
        res.status(200).send(questions);
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Getting Exercises' });
    }
});
exports.getAllExercises = getAllExercises;
const getExerciseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield Question_1.Question.findByPk(id);
        if (question) {
            res.status(200).send(question);
        }
        else {
            res.status(404).send({ message: 'Question Does Not Exist' });
        }
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Getting Exercise' });
    }
});
exports.getExerciseById = getExerciseById;
const addExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.question);
        const response = yield Question_1.Question.create(req.body.question);
        res.status(201).send({ question: response });
    }
    catch (e) {
        res.status(500).send({ error: e, message: 'Error Creating New Exercise' });
    }
});
exports.addExercise = addExercise;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Inqueue_1.Inqueue.create(req.body.uid);
        res.status(201).send({ uid: response });
    }
    catch (error) {
        res.status(500).send('ERROR');
    }
});
exports.addUser = addUser;
