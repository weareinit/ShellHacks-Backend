'use strict';
module.exports = (sequelize, DataTypes) => {
  var shirtsize = sequelize.define('shirtsize', {
    shirt_size: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return shirtsize;
};