const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { getHighSchools, getHighSchool, createHighSchool, updateHighSchool, deleteHighSchool } = require("../controllers/highschool.controller.js");


//get
router.get('/', authMiddleware, getHighSchools);
router.get('/:id', getHighSchool);

//create
router.post('/', authMiddleware, createHighSchool);

//update
router.put('/:id', authMiddleware, updateHighSchool);

//delete
router.delete('/:id', authMiddleware, deleteHighSchool);

module.exports = router;