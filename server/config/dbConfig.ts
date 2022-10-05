export const allConfig = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'mechattle',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  stage: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: { // https://github.com/sequelize/sequelize/issues/12083
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};