'use strict';

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
import { Dialect, Sequelize, Model } from 'sequelize';

import { Question } from './Question'

dotenv.config({
  path: '.env'
});

const DB_USER = "dsxhyebzxdqdfc"
const DB_PASS = "44e1a24702e6da77052894644edbc15b2b3837dd930082962cb398aef4bae2a6"

const sequelizeConfig = {
  dialect: 'postgres' as Dialect,
  logging: false
};

const sequelize = new Sequelize('d918l45mrulfio', DB_USER, DB_PASS, sequelizeConfig);

export { sequelize } 