const express = require("express");
const router = express.Router();
const School = require("./../models/School.js");
const authMiddleware = require('../middleware/authMiddleware');

const { getSchools, getSchool, createSchool, updateSchool, deleteSchool } = require("../controllers/school.controller.js");


//get
router.get('/', authMiddleware, getSchools);
router.get('/:id', authMiddleware, getSchool);

//create
router.post('/', authMiddleware, createSchool);

//update
router.put('/:id', authMiddleware, updateSchool);

//delete
router.delete('/:id', authMiddleware, deleteSchool);

module.exports = router;