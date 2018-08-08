'use strict';
module.exports = (sequelize, DataTypes) => {
  var shirt_sizes = sequelize.define('shirt_sizes', {
    shirt_size: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps:false
  });
  return shirt_sizes;
};