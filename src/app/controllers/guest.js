const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")


const controller = {
  index: (req, res) => {
    Recipe.all((recipes) => {
      return res.render("guest/index", { recipes })
    })
  },
  about: (req, res) => {
    return res.render('guest/about')
  },
  recipes: (req, res) => {
    Recipe.all((recipes) => {
      return res.render("guest/recipes", { recipes })
    })
  },
  show: (req, res) => {
    Recipe.find(req.params.id, (recipe) => {
      if(!recipe) return res.send('Recipe not found')

      console.log(recipe)
      return res.render("guest/show", {recipe})
    })
  },
  chefs: (req, res) => {
    Chef.all((chefs) => {
      return res.render("guest/chefs", { chefs })
    })
  },
  seach: (req, res) => {
    let { filter } = req.query
    if(!filter) {
      console.log(filter)
      return res.send('Recipe not found')
    } else {
      Recipe.findBy(filter, (recipes) => {
        return res.render("guest/seach", { recipes, filter})
      })
    }
  }
}

module.exports = controller