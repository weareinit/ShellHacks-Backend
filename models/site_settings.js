'use strict';
module.exports = (sequelize, DataTypes) => {
  var site_settings = sequelize.define('site_settings', {
    name: DataTypes.STRING,
    value: DataType.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps:false
  });
  return site_settings;
};