const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const { createTarget, updateTarget, deleteTarget } = require('../controllers/targetController');

// Create, update, and delete a target
router.post('/', upload.single('image'), createTarget);
router.put('/:id', updateTarget);
router.delete('/:id', deleteTarget);

module.exports = router;