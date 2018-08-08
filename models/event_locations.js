'use strict';
module.exports = (sequelize, DataTypes) => {
  var event_locations = sequelize.define('event_locations', {
    room: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps:false
  });
  return event_locations;
};