import { DataTypes, Model, BuildOptions } from 'sequelize';
import { sequelize } from './sequelize';

export interface GameAttributes {
   deck?: number;
   hasjoker?: boolean;
   remaining?: number;
   dead?: string;
   used?: string;
}

export interface GameInstance extends Model {
   id: number;
   createdAt: Date;
   updatedAt: Date;

   deck: number;
   hasjoker: boolean;
   remaining: number;
   dead: string;
   used: string;
}

export type GameModelStatic = typeof Model &
   (new (values?: object, options?: BuildOptions) => GameInstance);

export const Game = sequelize.define('Game', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true
   },
   deck: {
      type: DataTypes.INTEGER
   },
   hasjoker: {
      type: DataTypes.BOOLEAN
   },
   remaining: {
      type: DataTypes.NUMBER
   },
   dead: {
      type: DataTypes.STRING
   },
   used: {
      type: DataTypes.STRING
   }
}) as GameModelStatic;
