"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Question_1 = require("./Question");
let User = User_1 = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column
], User.prototype, "rank", void 0);
__decorate([
    sequelize_typescript_1.Column
], User.prototype, "rating", void 0);
__decorate([
    sequelize_typescript_1.Column
], User.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Column
], User.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => User_1)
], User.prototype, "friends", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Question_1.Question)
], User.prototype, "completedChallanges", void 0);
User = User_1 = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
