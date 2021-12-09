const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  values: [
    {
      value: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Key = mongoose.model('key', KeySchema);

module.exports = Key;
