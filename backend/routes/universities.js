const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getUniversities, createUniversity, getUniversity, updateUniversity, deleteUniversity } = require('../controllers/university.controller');

const router = express.Router();

// Create a new university
router.post('/', authMiddleware, createUniversity);

// Get all universities
router.get('/', authMiddleware, getUniversities);

// Get a university by ID
router.get('/:id', authMiddleware, getUniversity);

// Update a university by ID
router.put('/:id', authMiddleware, updateUniversity);

// Delete a university by ID
router.delete('/:id', authMiddleware, deleteUniversity);

module.exports = router;
