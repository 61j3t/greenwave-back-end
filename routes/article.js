const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', articleController.createArticle);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', articleController.getAllArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.get('/:id', articleController.getArticleById);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Update article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Article not found
 */
router.put('/:id', articleController.updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article ID
 *     responses:
 *       204:
 *         description: Article deleted
 *       404:
 *         description: Article not found
 */
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
