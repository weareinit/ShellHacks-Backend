'use strict';
module.exports = (sequelize, DataTypes) => {
  var major = sequelize.define('major', {
    major: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return major;
};