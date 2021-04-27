const data = require('../data.json')
const fs = require('fs')

exports.index = (req, res) => {
  return res.render('admin/index', { recipes: data.recipes })
}
exports.create = (req, res) => {
  return res.render('admin/create')
}
exports.post = (req, res) => {
  const keys = Object.keys(req.body)

  for (key of keys){
    if(req.body[key] == ""){
      return res.send('Please, fill all fields')
    }
  }

  let { image_recipe, ingredients, preparations, informationAdditional } = req.body

  let id = 1
  const lastRecipe = data.recipes.length

  if(lastRecipe) {
    id = lastRecipe + 1
  }

  data.recipes.push({
    id: Number(id),
    ...req.body
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error')

    return res.redirect('/admin/index')
  })
}
exports.show = (req, res) => {
  const { id } = req.params

  const foundRecipe = data.recipes.find(recipe => {
    return recipe.id == id
  })

  if (!foundRecipe) return res.send('Recipe not found')

  return res.render('admin/show', { recipe: foundRecipe})

}
exports.edit = (req, res) => {
  const { id } = req.params

  const foundRecipe = data.recipes.find(recipe => {
    return recipe.id == id
  })

  if (!foundRecipe) return res.send('Recipe not found')

  return res.render('admin/edit', { recipe: foundRecipe})
}
exports.put = (req, res) => {
  const { id } = req.body
  let index = 0

  const foundRecipe = data.recipes.find((recipe, foundIndex) => {
    if(id == recipe.id){
      index = foundIndex
      return true
    }
  })


  if (!foundRecipe) return res.send('Recipe not found')

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(id)
  }

  data.recipes[index] = recipe

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write error')

    return res.redirect(`/admin/recipes/${id}`)
  })

}
exports.delete = (req, res) => {
  const { id } = req.body

  const filteredRecipes = data.recipes.filter((recipe) => {
    return recipe.id != id
  })

  data.recipes = filteredRecipes

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write error')

    return res.redirect('recipes')
  })
}