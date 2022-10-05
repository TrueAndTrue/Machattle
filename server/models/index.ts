'use strict';

import dotenv from 'dotenv'
import { Dialect, Sequelize, Model } from 'sequelize';
import url from 'url';

import { allConfig } from '../config/dbConfig';
import { Question } from './Question'

dotenv.config({
  path: '.env'
});

const config = allConfig['stage'];

const DB_USER = "dsxhyebzxdqdfc"
const DB_PASS = "44e1a24702e6da77052894644edbc15b2b3837dd930082962cb398aef4bae2a6"

const dbConfig = {
  dialect: 'postgres' as Dialect,
  logging: false
};

let sequelize :Sequelize;
const { DATABASE_URL } = process.env;
if (DATABASE_URL ){
  const dbUrl = url.parse(DATABASE_URL);
  if (dbUrl.auth &&dbUrl.path){
    const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
    const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
    const dbName = dbUrl.path.slice(1);
    const host = dbUrl.hostname;
    const { port } = dbUrl;
    sequelize = new Sequelize(dbName, username, password, dbConfig);
  }
} else {
  sequelize = new Sequelize('codewars', 'postgres', 'password', dbConfig)
}

export { sequelize } 