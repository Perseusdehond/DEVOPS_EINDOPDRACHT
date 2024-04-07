const express = require('express');
const router = express.Router();
const { getTarget, getTargets } = require('../controllers/targetController');


router.get('/:id', getTarget);

// List all targets
router.get('/', getTargets);

module.exports = router;