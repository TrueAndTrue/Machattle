"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const UserQuestion_1 = require("./UserQuestion");
const index_1 = require("./index");
let Question = class Question extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column
], Question.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column
], Question.prototype, "question", void 0);
__decorate([
    sequelize_typescript_1.Column
], Question.prototype, "tests", void 0);
__decorate([
    sequelize_typescript_1.Column
], Question.prototype, "difficulty", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.User, () => UserQuestion_1.UserQuestion)
], Question.prototype, "completedQuestions", void 0);
Question = __decorate([
    sequelize_typescript_1.Table
], Question);
exports.Question = Question;
Question.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    question: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    tests: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: index_1.sequelize,
    paranoid: true
});
