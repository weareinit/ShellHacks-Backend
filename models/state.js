'use strict';
module.exports = (sequelize, DataTypes) => {
  var state = sequelize.define('state', {
    state: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return state;
};