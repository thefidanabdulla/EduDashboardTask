const School = require("./../models/School")

//get
const getSchools = async (req, res) => {
  try {
    const schools = await School.find({});
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id);
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create
const createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//update
const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findByIdAndUpdate(id, req.body);

    if (!school) {
      return res.status(404).json({ message: "School not found :/" })
    }

    const updatedSchool = await School.findById(id);
    res.status(200).json(updatedSchool);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete
const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findByIdAndDelete(id);

    if (!school) {
      return res.status(404).json({ message: "School not found :/" });
    }

    res.status(200).json({ message: "School deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getSchools,
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool
}

