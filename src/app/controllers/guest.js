const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")


const controller = {
  async index(req, res) {
    const results = await Recipe.all()
    const recipes = results.rows

    return res.render("guest/index", { recipes })
  },
  about(req, res) {
    return res.render('guest/about')
  },
  async recipes(req, res) {
    const results = await Recipe.all()
    const recipes = results.rows

    return res.render("guest/recipes", { recipes })
  },
  async show(req, res) {
    const results  = await Recipe.find(req.params.id)
    const recipe = results.row[0]

    if(!recipe) return res.send('Recipe not found')

    return res.render("guest/show", {recipe})
  },
  async chefs(req, res) {
    const results = await Chef.all()
    const chefs =  results.rows

    return res.render("guest/chefs", { chefs })
  },
  async seach(req, res) {
    let { filter } = req.query
    if(!filter) {
      return res.send('Recipe not found')
    } else {
      const results = await Recipe.findBy(filter)
      const recipes = results.rows
      
      return res.render("guest/seach", { recipes, filter})
    }
  }
}

module.exports = controller