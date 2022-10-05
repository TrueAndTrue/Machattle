'use strict';

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
import { Dialect, Sequelize, Model } from 'sequelize';

import { Question } from './Question'

dotenv.config({
  path: '.env'
});

const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASS = process.env.DB_PASS || 'password'

const sequelizeConfig = {
  dialect: 'postgres' as Dialect,
  logging: false
};

const sequelize = new Sequelize('codewars', DB_USER, DB_PASS, sequelizeConfig);

export { sequelize } 