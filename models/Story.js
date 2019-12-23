const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const StorySchema = new mongoose.Schema(
  {
    created_by: {
      type: ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    cover : {
      type: String,
      required: true
    },
    pages: [
      {
        page_number: {
          type: Number,
          required: true
        },
        text: {
          type: String,
          required: true
        },
        audio: {
          type: String
        },
        content: {
          type: String,
          required: true
        }
      }
    ],
    tags: [
      { type: String }
    ],
  },
  {
    timestamps: { createdAt: 'created_at' }
  }
);

module.exports = mongoose.model('Story', StorySchema);
