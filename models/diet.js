'use strict';
module.exports = (sequelize, DataTypes) => {
  var diet = sequelize.define('diet', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return diet;
};