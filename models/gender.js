'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gender = sequelize.define('genders', {
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