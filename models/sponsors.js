'use strict';
module.exports = (sequelize, DataTypes) => {
  var sponsor = sequelize.define('sponsors', {
    name: DataTypes.STRING,
    tier: DataTypes.STRING,
    logo: DataTypes.BLOB('medium')
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return sponsor;
};