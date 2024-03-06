
const Recipe = require('./Recipe');

const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, image } = req.body;



    const newRecipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      image,
    });

    res.status(201).json({
      message: 'Recipe created successfully',
      recipe: newRecipe,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Recipe creation failed' });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

 

    const recipe = await Recipe.getOne(id);

    if (recipe) {
      res.status(200).json({
        message: 'Recipe retrieved successfully',
        recipe,
      });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllRecipes = async (req, res) => {
  try {
 

    const recipes = await Recipe.getAll();

    res.status(200).json({
      message: 'Recipes retrieved successfully',
      recipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;


    const updatedRecipe = await Recipe.update(id, updatedData);

    res.status(200).json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Recipe update failed' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    

    await Recipe.delete(id);

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Recipe deletion failed' });
  }
};

module.exports = {
  createRecipe,
  getRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,

};
