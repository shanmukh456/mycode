
const db = require('./db');

class Recipe {
  constructor(title, description, ingredients, instructions, image) {
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.image = image;
  }

  static create(recipe) {
    return new Promise((resolve, reject) => {
     
      const stmt = db.prepare('INSERT INTO recipes (title, description, ingredients, instructions, image) VALUES (?, ?, ?, ?, ?)');
      stmt.run(recipe.title, recipe.description, recipe.ingredients, recipe.instructions, recipe.image, function (err) {
        if (err) {
          reject(err.message);
        } else {
          const newRecipe = new Recipe(recipe.title, recipe.description, recipe.ingredients, recipe.instructions, recipe.image);
          resolve(newRecipe);
        }

        stmt.finalize();
      });
    });
  }

  static getOne(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          const recipe = row ? new Recipe(row.title, row.description, row.ingredients, row.instructions, row.image) : null;
          resolve(recipe);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM recipes', [], (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          const recipes = rows.map(row => new Recipe(row.title, row.description, row.ingredients, row.instructions, row.image));
          resolve(recipes);
        }
      });
    });
  }

  static update(id, updatedRecipe) {
    return new Promise((resolve, reject) => {
     
      const stmt = db.prepare('UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, image = ? WHERE id = ?');
      stmt.run(updatedRecipe.title, updatedRecipe.description, updatedRecipe.ingredients, updatedRecipe.instructions, updatedRecipe.image, id, function (err) {
        if (err) {
          reject(err.message);
        } else {
          const updatedRecipe = new Recipe(updatedRecipe.title, updatedRecipe.description, updatedRecipe.ingredients, updatedRecipe.instructions, updatedRecipe.image);
          resolve(updatedRecipe);
        }

        stmt.finalize();
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
   
      db.run('DELETE FROM recipes WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err.message);
        } else {
          resolve({ message: `Recipe with ID ${id} deleted successfully` });
        }
      });
    });
  }
}

module.exports = Recipe;
