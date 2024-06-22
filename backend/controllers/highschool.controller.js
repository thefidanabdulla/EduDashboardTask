const HighSchool = require("./../models/HighSchool")

//get
const getHighSchools = async (req, res) => {
  try {
    const highschools = await HighSchool.find({});
    res.status(200).json(highschools);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getHighSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const highschool = await HighSchool.findById(id);
    res.status(200).json(highschool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create
const createHighSchool = async (req, res) => {
  try {
    const highschool = await HighSchool.create(req.body);
    res.status(200).json(highschool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//update
const updateHighSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const highschool = await HighSchool.findByIdAndUpdate(id, req.body);

    if (!highschool) {
      return res.status(404).json({ message: "HighSchool not found :/" })
    }

    const updatedHighSchool = await HighSchool.findById(id);
    res.status(200).json(updatedHighSchool);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete
const deleteHighSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const highschool = await HighSchool.findByIdAndDelete(id);

    if (!highschool) {
      return res.status(404).json({ message: "HighSchool not found :/" });
    }

    res.status(200).json({ message: "HighSchool deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getHighSchools,
  getHighSchool,
  createHighSchool,
  updateHighSchool,
  deleteHighSchool
}

