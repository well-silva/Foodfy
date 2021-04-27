const data = require('../data.json')

exports.index = (req, res) => {

  return res.render('guest/index', { recipes: data.recipes })
}

exports.about = (req, res) => {
  return res.render('guest/about')
}

exports.recipes = (req, res) => {
  return res.render('guest/recipes', { recipes: data.recipes })
}

exports.recipeDetails = (req, res) => {
  const { id } = req.params

  const foundRecipe = data.recipes.find(recipe => {
      return recipe.id == id
  })

  if (!foundRecipe) {
      return res.send('Recipe not found')
  }

  return res.render('guest/recipe', { recipe: foundRecipe })
}