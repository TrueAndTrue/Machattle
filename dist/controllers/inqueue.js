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
exports.addUser = void 0;
const Inqueue_1 = require("../models/Inqueue");
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
