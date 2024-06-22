const University = require('../models/University');

const createUniversity = async (req, res) => {
    const { name, address, president, students, email, corpus } = req.body;
    try {
        const newUniversity = new University({ name, address, president, students, email, corpus });
        const university = await newUniversity.save();
        res.status(201).json(university);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.json(universities);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getUniversity = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.json(university);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const updateUniversity = async (req, res) => {
    const { name, address, president, students, email, corpus } = req.body;
    try {
        let university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        university.name = name;
        university.address = address;
        university.president = president;
        university.students = students;
        university.email = email;
        university.corpus = corpus;

        university = await university.save();
        res.json(university);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const deleteUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const university = await University.findByIdAndDelete(id);

        if (!university) {
            return res.status(404).json({ message: "University not found :/" });
        }

        res.status(200).json({ message: "University deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getUniversities,
    createUniversity,
    getUniversity,
    updateUniversity,
    deleteUniversity
}


