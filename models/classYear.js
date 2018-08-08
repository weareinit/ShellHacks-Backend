'use strict';
module.exports = (sequelize, DataTypes) => {
  var classYear = sequelize.define('classYear', {
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return classYear;
};