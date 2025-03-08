import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  apiKey: string;
  requestsThisMonth: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'requestsThisMonth'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public apiKey!: string;
  public requestsThisMonth!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  apiKey: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  requestsThisMonth: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
}, {
  sequelize,
  tableName: 'users',
});
