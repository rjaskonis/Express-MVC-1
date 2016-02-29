"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('people', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
  },
  {
    tableName: 'people',
    createdAt: false,
    updatedAt: false
  });
};