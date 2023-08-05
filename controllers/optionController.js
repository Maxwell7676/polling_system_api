
const Question = require('../models/questionModel.js');
const Option = require('../models/optionModels.js')
const Vote = require('../models/voteModels.js')




// Controller to add an option to a question
exports.createOption = async (req, res) => {
  try {
    //console.log('Reached createOption function');
    const questionId = req.params.id;
    

    const question = await Question.findById(questionId);
    

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const { options } = req.body;

   
    const createdOptions = await Option.insertMany(
      options.map((text) => ({ text, question: questionId }))
    );

    question.options.push(...createdOptions.map((option) => option._id));
    await question.save();

    res.status(201).json(createdOptions);
  } catch (err) {
    console.error('Error in createOption function:', err);
    res.status(500).json({ error: 'Unable to add option' });
  }
};


// Controller to delete an option
exports.deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    console.log(optionId);

    const option = await Option.findById(optionId);

    console.log(option);

    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    const votes = await Vote.countDocuments({ option: optionId });
    console.log(votes);
    if (votes > 0) {
      return res.status(400).json({ error: 'Cannot delete option with votes' });
    }

    await option.deleteOne();
    res.status(200).json({ message: 'Option deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete option' });
  }
};

// Controller to add a vote to an option
exports.addVote = async (req, res) => {
  try {
    const optionId = req.params.id;
    console.log(optionId);
    const option = await Option.findById(optionId);
    console.log(option);

    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    option.votes++;
    await option.save();

    await Vote.create({ option: optionId });

    res.status(200).json({ message: 'Vote added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to add vote' });
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
