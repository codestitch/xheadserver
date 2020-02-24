'use strict';

import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from './sequelize';
import { TodoItemDefineModel } from './todoitem';

// We need to declare an interface for our model that is basically what our class would be
interface TodoModel extends Model {
   title: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type TodoModelStatic = typeof Model &
   (new (values?: object, options?: BuildOptions) => TodoModel);

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const Todo = sequelize.define('Todo', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
   },
   title: {
      type: DataTypes.STRING
   }
}) as TodoModelStatic;

// TodoDefineModel.hasMany(TodoItemDefineModel, {
//    sourceKey: 'id',
//    foreignKey: 'todoId',
//    as: 'todoitems' // this determines the name in `associations`!
//  });

export { Todo, TodoModel };
