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
exports.addExercise = exports.getExerciseById = exports.getAllExercises = void 0;
const Question_1 = require("../models/Question");
const getAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield Question_1.Question.findAll();
        res.status(200).send({ error: false, res: questions });
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Getting Exercises' });
    }
});
exports.getAllExercises = getAllExercises;
const getExerciseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield Question_1.Question.findByPk(id);
        if (question) {
            res.status(200).send({ error: false, res: question });
        }
        else {
            res.status(404).send({ error: true, res: 'Question Does Not Exist' });
        }
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Getting Exercise' });
    }
});
exports.getExerciseById = getExerciseById;
const addExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield Question_1.Question.create(req.body.question);
        res.status(201).send({ error: false, res: question });
    }
    catch (e) {
        res.status(500).send({ error: true, res: 'Error Creating New Exercise' });
    }
});
exports.addExercise = addExercise;
