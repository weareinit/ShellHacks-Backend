'use strict';
module.exports = (sequelize, DataTypes) => {
  var eventSchedule = sequelize.define('eventSchedule', {
    start: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return eventSchedule;
};