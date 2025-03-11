import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../sequelize';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Check if we're using the memory store
const isMemoryStore = 'getUser' in sequelize;

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public apiKey!: string;
  public requestsThisMonth!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public stripeCustomerId?: string;
  public subscriptionStatus?: string; // 'free', 'active', 'past_due', 'canceled'
  public subscriptionId?: string;
  public subscriptionEndsAt?: Date;

  // Add these utility methods that work regardless of storage type
  static async findOne(options: any): Promise<any> {
    if (isMemoryStore) {
      // Handle memory store lookups
      if (options.where && options.where.apiKey) {
        return (sequelize as any).getUser(options.where.apiKey);
      }
      if (options.where && options.where.email) {
        const users = Array.from((sequelize as any).users.values());
        return users.find(u => (u as User).email === options.where.email) || null;
      }
      return null;
    }
    // Use normal Sequelize behavior
    return super.findOne(options);
  }
}

// Only initialize with Sequelize if we're not using memory store
if (!isMemoryStore) {
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
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'free'
    },
    subscriptionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subscriptionEndsAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize: sequelize as Sequelize,
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
}

export default User;
