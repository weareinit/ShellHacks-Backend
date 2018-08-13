'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hacker = sequelize.define('hacker', {
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
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
    check_in_code: DataTypes.STRING,
    has_rsvp: DataTypes.BOOLEAN
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