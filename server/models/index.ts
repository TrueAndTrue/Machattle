import { Sequelize } from "sequelize";

let sequelize :Sequelize;
if (process.env.HEROKU_POSTGRESQL_JADE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize =new Sequelize(process.env.HEROKU_POSTGRESQL_JADE_URL,
  {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    host: "<heroku host>",
    logging: false
  });
} else {
// the application is executed on the local machine ... use mysql
  sequelize =new Sequelize("postgres://postgres:password@localhost:5432/codewars",
  {
    dialect: "postgres"
  }
 );
}

export { sequelize }