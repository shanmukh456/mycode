const express = require('express');
const recipeController = require('./recipeController');
const authMiddleware = require('./authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/create', recipeController.create);
router.get('/:id', recipeController.getOne);
router.get('/', recipeController.getAll);
router.put('/:id', recipeController.update);
router.delete('/:id', recipeController.delete);

module.exports = router;
