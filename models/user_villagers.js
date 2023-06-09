'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Villagers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.belongsToMany(models.Villagers, { through: User_Villagers });
      models.Villagers.belongsToMany(models.Users, {through: User_Villagers}) 
    }
  }
  User_Villagers.init({
    userId: DataTypes.INTEGER,
    villagerId: DataTypes.INTEGER,
    currentlyOnIsland: DataTypes.BOOLEAN,
    wasOnIsland: DataTypes.BOOLEAN,
    isFavorite: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User_Villagers',
  });
  return User_Villagers;
};