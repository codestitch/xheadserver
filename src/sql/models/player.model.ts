import { DataTypes, Model, BuildOptions } from 'sequelize';
import { sequelize } from './sequelize';
import { Game } from './game.model';

interface PlayerAttributes {
   name?: string;
   blinds?: string;
   hands?: string;
   trumps?: string;
}

interface PlayerInstance extends Model {
   id: number;
   createdAt: Date;
   updatedAt: Date;

   name: string;
   blinds: string;
   hands: string;
   trumps: string;
}

type PlayerModelStatic = typeof Model &
   (new (values?: object, options?: BuildOptions) => PlayerInstance);

const Player = sequelize.define('Player', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING
   },
   blinds: {
      type: DataTypes.STRING
   },
   hands: {
      type: DataTypes.STRING
   },
   trumps: {
      type: DataTypes.STRING
   }
}) as PlayerModelStatic;

export { Player, PlayerAttributes }
