import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

// Définition des attributs
interface TaskAttributes {
  id: number;
  title: string;
  completed: boolean;
}

// Attributs optionnels à la création
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'completed'> {}

// Classe Task typée
export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public completed!: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Task'
  }
);
