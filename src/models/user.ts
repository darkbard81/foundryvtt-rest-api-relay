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
  public subscriptionStatus?: string;
  public subscriptionId?: string;
  public subscriptionEndsAt?: Date;

  // Memory store methods
  static async findOne(options: any): Promise<any> {
    if (isMemoryStore) {
      if (options.where && options.where.apiKey) {
        return (sequelize as any).getUser(options.where.apiKey);
      }
      if (options.where && options.where.email) {
        const users = Array.from((sequelize as any).users.values());
        return users.find(u => (u as User).email === options.where.email) || null;
      }
      return null;
    }
    return super.findOne(options);
  }

  static async create(data: any): Promise<any> {
    if (isMemoryStore) {
      const memoryStore = sequelize as any;
      
      if (memoryStore.users.has(data.email)) {
        throw new Error('User already exists');
      }
      
      const user: any = {
        id: memoryStore.users.size + 1,
        email: data.email,
        password: data.password,
        apiKey: data.apiKey || crypto.randomBytes(16).toString('hex'),
        requestsThisMonth: data.requestsThisMonth || 0,
        subscriptionStatus: data.subscriptionStatus || 'free',
        createdAt: new Date(),
        updatedAt: new Date(),
        getDataValue: function(key: string): any { 
          return (this as any)[key]; 
        },
        setDataValue: function(key: string, value: any): void { 
          (this as any)[key] = value; 
        }
      };
      
      memoryStore.users.set(data.email, user);
      memoryStore.apiKeys.set(user.apiKey, data.email);
      
      return user;
    }
    
    return super.create(data);
  }

  static async findAll(options: any): Promise<any[]> {
    if (isMemoryStore) {
      const memoryStore = sequelize as any;
      if (options.where && options.where.apiKey) {
        const user = memoryStore.getUser(options.where.apiKey);
        return user ? [user] : [];
      }
      return Array.from(memoryStore.users.values());
    }
    return super.findAll(options);
  }
}

// Initialize with Sequelize if not using memory store
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
    tableName: 'Users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.getDataValue('password')) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
          user.setDataValue('password', hashedPassword);
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
