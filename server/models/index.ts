import dotenv from 'dotenv'
import path from 'path'
import { Sequelize } from "sequelize";

import { Question } from './Question'

let sequelize :Sequelize;
let models  = [Question];

dotenv.config({ path: path.join(__dirname,'../.env')});

if (process.env.HEROKU_POSTGRESQL_COBALT_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize =new Sequelize(process.env.HEROKU_POSTGRESQL_COBALT_URL,
  {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    host: "<heroku host>",
    logging: false
  });
} else {

  const DB_NAME = process.env.DB_NAME || 'mechattle'
  const DB_USER = process.env.DB_USER || 'postgres'
  const DB_PASS = process.env.DB_PASS || 'password'

// the application is executed on the local machine
  sequelize =new Sequelize(DB_NAME, DB_USER, DB_PASS, 
  {
    dialect: "postgres",
    logging:false
  }
 );
}

export { sequelize, models }