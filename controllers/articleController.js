const Article = require('../models/Article');

exports.createArticle = async (req, res) => {
  const { title, description, text, owner, photo, date } = req.body;
  try {
    const article = new Article({
      title,
      description,
      text,
      owner,
      photo,
      date
    });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  const { title, description, text, owner, photo, date } = req.body;
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    article.title = title || article.title;
    article.description = description || article.description;
    article.text = text || article.text;
    article.owner = owner || article.owner;
    article.photo = photo || article.photo;
    article.date = date || article.date;

    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
