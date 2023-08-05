const express = require('express');
const router = express.Router();

//const optionController = require('../controllers/optionController');
const optionController = require('../controllers/optionController.js');


// Route to add a vote to an option
router.post('/:id/addVote', optionController.addVote);

module.exports = router;
