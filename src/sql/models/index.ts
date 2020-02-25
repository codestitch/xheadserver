// export * from './sequelize';
// export * from './todo';
// export * from './todoitem';
// export * from './game.model';
import { sequelize } from './sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Todo } from './todo';
import { TodoItemDefineModel } from './todoitem';

export const db = {
   sequelize,
   Sequelize,
   Todo,
   TodoItemDefineModel
}