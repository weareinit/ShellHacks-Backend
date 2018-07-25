'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hacker = sequelize.define('Hacker', {
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
    class_year: DataTypes.INTEGER,
    major: DataTypes.INTEGER,
    school: DataTypes.INTEGER,
    race: DataTypes.INTEGER,
    is_hispanic: DataTypes.BOOLEAN,
    state: DataTypes.INTEGER,
    shirt_size: DataTypes.INTEGER,
    diet_restriction: DataTypes.INTEGER,
    diet_other: DataTypes.TEXT,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    is_first_hackathon: DataTypes.BOOLEAN,
    activity_info: DataTypes.TEXT,
    resume: DataTypes.STRING,
    sid: DataTypes.STRING,

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }, 
    timestamps:false,
  });
  return Hacker;
};