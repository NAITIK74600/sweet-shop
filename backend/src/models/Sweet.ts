import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SweetAttributes {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SweetCreationAttributes extends Optional<SweetAttributes, 'id' | 'description' | 'imageUrl'> {}

class Sweet extends Model<SweetAttributes, SweetCreationAttributes> implements SweetAttributes {
  public id!: number;
  public name!: string;
  public category!: string;
  public price!: number;
  public quantity!: number;
  public description?: string;
  public imageUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sweet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'sweets'
  }
);

export default Sweet;
