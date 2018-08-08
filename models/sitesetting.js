'use strict';
module.exports = (sequelize, DataTypes) => {
  var sitesetting = sequelize.define('sitesetting', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sitesetting;
};