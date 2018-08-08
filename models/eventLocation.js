'use strict';
module.exports = (sequelize, DataTypes) => {
  var eventLocation = sequelize.define('event-location', {
    room: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return eventLocation;
};