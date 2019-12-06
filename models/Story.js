const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    created_by: {
      type: ObjectId,
      ref: 'User'
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
        voice: {
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
