// const express = require('express');
// const router = express.Router();

// const questionController = require('../controllers/questionController.js');
// const optionController = require('../controllers/optionController.js');

// // Route to create a new question
// router.post('/create', questionController.createQuestion);

// // Route to delete a question
// router.delete('/:id', questionController.deleteQuestion);

// // Route to add an option to a question
// router.post('/:id/options/create', optionController.createOption);

// // Route to view a question and its options with vote counts
// router.get('/:id', optionController.viewQuestion);

// module.exports = router;


//-------------------------



// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const optionController = require('../controllers/optionController.js');

// Route to create a new question
router.post('/create', questionController.createQuestion);

// Route to delete a question
router.delete('/:id', questionController.deleteQuestion);

//view questions
router.get('/:id', questionController.viewQuestion);

// Route to create an option
router.post('/:id/options/create', optionController.createOption);


//Router to delete options
router.delete('/:id/options/:id', optionController.deleteOption);

module.exports = router;
