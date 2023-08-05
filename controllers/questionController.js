
// controllers/questionController.js
const Question = require('../models/questionModel.js');
const Vote = require('../models/voteModels.js');

// Controller to create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { title } = req.body;
    const question = await Question.create({ title });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create question' });
  }
};



// Controller to delete a question
exports.deleteQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;

      //console.log(questionId);

      const question = await Question.findById(questionId).populate('options');
      
      //console.log(question);
  
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      for (const option of question.options) {
        const votes = await Vote.countDocuments({ option: option._id });

        console.log(votes);

        if (votes > 0) {
          return res.status(400).json({ error: 'Cannot delete question with votes' });
        }
      }
  
      // If there are no options with votes, delete the question
      await question.deleteOne();
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Unable to delete question' });
    }
  };
  

  
// Controller to view a question and its options with vote counts
exports.viewQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
      const question = await Question.findById(questionId).populate('options');
  
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      const questionWithOptions = {
        id: question._id,
        title: question.title,
        options: question.options.map((option) => ({
          id: option._id,
          text: option.text,
          votes: option.votes,
          link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
        })),
      };
  
      res.status(200).json(questionWithOptions);
    } catch (err) {
      res.status(500).json({ error: 'Unable to view question' });
    }
  };
  


