import { config } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Game } from './game';
import { Player } from './player';

config();

const env = process.env.NODE_ENV || 'development';
// tslint:disable-next-line: no-var-requires
const localConfig = require('..\\..\\db\\config\\config.json')[env];

let sequelize: Sequelize;
if (localConfig.use_env_variable) {
   const envVar = process.env[localConfig.use_env_variable] as string;
   sequelize = new Sequelize(envVar, localConfig);
} else {
   sequelize = new Sequelize(
      localConfig.database,
      localConfig.username,
      localConfig.password,
      localConfig
   );
}

sequelize.addModels([Game, Player]);

function initSequelize() {
   console.log('Sequelize initialized');
}

export { sequelize, initSequelize };
