import { sequelize, initSequelize } from './sequelize';
import { Sequelize } from 'sequelize-typescript';

export const db = {
   sequelize,
   Sequelize,
   init: initSequelize
};

export * from './player';
export * from './game';