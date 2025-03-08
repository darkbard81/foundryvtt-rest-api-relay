import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare apiKey: string;
  declare requestsThisMonth: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static async authenticate(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
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
  hooks: {
    beforeCreate: async (user: User) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

export default User;
