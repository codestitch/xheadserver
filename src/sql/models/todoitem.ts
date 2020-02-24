'use strict';

import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from './sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface TodoItemModel extends Model {
   readonly id: number;
   desciption: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type TodoItemModelStatic = typeof Model &
   (new (values?: object, options?: BuildOptions) => TodoItemModel);

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const TodoItemDefineModel = sequelize.define('TodoItem', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
   },
   desciption: {
      type: DataTypes.STRING
   }
}) as TodoItemModelStatic;

export { TodoItemDefineModel };
