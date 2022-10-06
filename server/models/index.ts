import { Sequelize } from "sequelize";

let sequelize :Sequelize;
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
// the application is executed on the local machine ... use mysql
  sequelize =new Sequelize("codewars",'postgres','password', 
  {
    dialect: "postgres",
    logging:false
  }
 );
}

export { sequelize }