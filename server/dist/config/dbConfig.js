"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allConfig = void 0;
exports.allConfig = {
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
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
