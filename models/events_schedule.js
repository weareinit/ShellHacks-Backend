'use strict';
module.exports = (sequelize, DataTypes) => {
  var events_schedule = sequelize.define('events_schedule', {
    start: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps:false
  });
  return events_schedule;
};