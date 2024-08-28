import { sequelize } from "config/sequelize";
import {
  DataTypes,
  UUIDV4,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
export interface IUserModel
  extends Model<
    InferAttributes<IUserModel>,
    InferCreationAttributes<IUserModel>
  > {
  user_id: CreationOptional<string>;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  country: string;
  image: CreationOptional<string>;
  email: string;
  salt: CreationOptional<string>;
  password: string;
}

const UserModel = sequelize.define<IUserModel>("user", {
  user_id: {
    defaultValue: UUIDV4,
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: "unique_error",
      msg: "Email already exists, please try using another email address",
    },
    validate: {
      isEmail: true,
    },
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserModel;
