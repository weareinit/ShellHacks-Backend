'use strict';
module.exports = (sequelize, DataTypes) => {
  var class_years = sequelize.define('class_years', {
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps:false
  });
  return class_years;
};