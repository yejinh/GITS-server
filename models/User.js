const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profile_photo: {
    type: String,
    required: true
  },
  my_stories: [
    {
      story: {
        type: ObjectId,
        ref: 'Story'
      }
    }
  ],
  favorites: [
    {
      favorite: {
        type: ObjectId,
        ref: 'Story'
      }
    }
  ],
  history: [
    {
      story: {
        type: ObjectId,
        ref: 'Story'
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
