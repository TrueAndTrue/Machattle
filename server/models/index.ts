'use strict';

import { Dialect, Sequelize, Model } from 'sequelize';

import { Question } from './Question'

const dbConfig = {
  dialect: 'postgres' as Dialect,
  logging: false
};

const sequelize = new Sequelize("d918l45mrulfio", "dsxhyebzxdqdfc", "44e1a24702e6da77052894644edbc15b2b3837dd930082962cb398aef4bae2a6", dbConfig);

export { sequelize } 