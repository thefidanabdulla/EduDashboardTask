const mongoose = require('mongoose');

const CorpusSchema = new mongoose.Schema({
    department: { type: String, required: true },
    head: { type: String, required: true },
    numberOfCourses: { type: Number, required: true }
});

const UniversitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    president: { type: String, required: true },
    students: { type: Number, required: true },
    email: { type: String, required: true },
    corpus: [CorpusSchema]
});

const University = mongoose.model('University', UniversitySchema);

module.exports = University;
