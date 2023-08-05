const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
