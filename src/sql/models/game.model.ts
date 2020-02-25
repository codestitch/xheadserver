import { DataTypes, Model, BuildOptions } from 'sequelize';
import { sequelize } from './sequelize';
import { Player } from './player.model';

interface GameAttributes {
   deck?: number;
   hasjoker?: boolean;
   remaining?: number;
   dead?: string;
   used?: string;
}

interface GameInstance extends Model {
   id: number;
   createdAt: Date;
   updatedAt: Date;

   deck: number;
   hasjoker: boolean;
   remaining: number;
   dead: string;
   used: string;
}

type GameModelStatic = typeof Model &
   (new (values?: object, options?: BuildOptions) => GameInstance);

const Game = sequelize.define('Game', {
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

Game.hasMany(Player, { sourceKey: 'id', foreignKey: 'gameId', as: 'players' });
Player.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'id', onDelete: 'CASCADE' });

export { Game, GameAttributes }
