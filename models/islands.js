'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Islands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Islands.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  }
  Islands.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    fruits: DataTypes.STRING,
    flowers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Islands',
  });
  return Islands;
};