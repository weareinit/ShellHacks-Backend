'use strict';
module.exports = (sequelize, DataTypes) => {
  var sponsor = sequelize.define('sponsors', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return sponsor;
};