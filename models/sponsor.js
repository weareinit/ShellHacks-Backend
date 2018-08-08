'use strict';
module.exports = (sequelize, DataTypes) => {
  var sponsor = sequelize.define('sponsor', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return sponsor;
};