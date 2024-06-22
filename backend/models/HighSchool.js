const mongoose = require("mongoose");

const HighSchoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter school name"],
    },
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
    principal: {
      type: String,
      required: [true, "Please enter the principal"],
    },
    students: {
      type: Number,
      required: [true, "Please enter students size"],
      default: 0,
    },
    graduationRate: {
      type: Number,
      required: [true, "Please enter raduation rate"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const HighSchool = mongoose.model("HighSchool", HighSchoolSchema);

module.exports = HighSchool;