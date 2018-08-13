'use strict';
module.exports = (sequelize, DataTypes) => {
  var sponsor = sequelize.define('sponsors', {
    name: DataTypes.STRING,
    tier: DataType.STRING,
    logo: DataType.BLOB('medium')
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