const mongoose = require("mongoose");

const SchoolSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);


const School = mongoose.model("School", SchoolSchema);

module.exports = School;