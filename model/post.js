const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    category: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  { timestamps: true });
  
  module.exports = mongoose.model('Post', postSchema);