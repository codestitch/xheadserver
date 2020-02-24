import { config } from 'dotenv';
config();
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
// tslint:disable-next-line: no-var-requires
const localConfig = require('..\\..\\config\\config.json')[env];

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

export { sequelize };
