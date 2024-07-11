const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
