const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  fullname: {
    type: String, // Use String instead of STRING
  },

  address: {
    type: String, // Use String instead of STRING
  },

  grade: {
    type: Number, // Use Number instead of INTEGER

  },

  rollno: {
    type: Number, // Use Number instead of INTEGER
  },

  age: {
    type: Number, // Use Number instead of INTEGER
  },

  contactno: {
    type: Number,
  },
},
  {
    timestamps: true
});

const Students = mongoose.model("Students", studentsSchema);
module.exports = Students;



/*
*Alternative of code no. 48 and 49
 TODO: module.exports = mongoose.model("Students", studentsSchema)
*/