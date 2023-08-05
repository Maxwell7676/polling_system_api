const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  option: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
