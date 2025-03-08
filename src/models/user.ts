import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public apiKey!: string;
  public requestsThisMonth!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => crypto.randomBytes(16).toString('hex')
  },
  requestsThisMonth: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users', // Be explicit about the table name
  hooks: {
    beforeCreate: async (user) => {
      if (user.getDataValue('password')) { // Use getDataValue instead of direct property access
        console.log('Hashing password for user:', user.getDataValue('email'));
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
        user.setDataValue('password', hashedPassword);
        console.log('Password hashed successfully');
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        console.log('Updating password for user:', user.getDataValue('email'));
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
        user.setDataValue('password', hashedPassword);
      }
    }
  }
});

export default User;
