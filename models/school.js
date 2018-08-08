'use strict';
module.exports = (sequelize, DataTypes) => {
  var school = sequelize.define('school', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return school;
};