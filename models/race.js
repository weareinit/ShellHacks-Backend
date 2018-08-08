'use strict';
module.exports = (sequelize, DataTypes) => {
  var race = sequelize.define('race', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return race;
};