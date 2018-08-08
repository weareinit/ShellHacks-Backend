'use strict';
module.exports = (sequelize, DataTypes) => {
  var eventLocation = sequelize.define('eventLocation', {
    room: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return eventLocation;
};