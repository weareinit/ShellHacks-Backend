'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gender = sequelize.define('gender', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return Gender;
};