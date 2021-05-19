const Recipe = require("../models/Recipe")

const controller = {
  async index(req, res) {

    const results = await Recipe.all()

    const recipes = results.rows

    console.log(recipes)

    return res.render("admin/recipes/index", { recipes })
  },
  async create(req, res) {
    const results = await Recipe.chefsSelectOptions()
    const chefsOptions = results.rows

    return res.render('admin/recipes/create', { chefsOptions })
  },
  async post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys){
      if(req.body[key] == ""){
        return res.send('Please, fill all fields')
      }
    }

    const results = await Recipe.create(req.body)
    const recipe = results.rows[0]

    return res.redirect(`/admin/recipes/${recipe.id}`)

  },
  async show(req, res) {

    const results  = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    return res.render("admin/recipes/show", { recipe })
  },
  async edit(req, res) {

    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    results = await Recipe.chefsSelectOptions()
    const chefsOptions = results.rows

    return res.render("admin/recipes/edit", { recipe, chefsOptions })
  },
  async put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys){
      if(req.body[key] == ""){
        return res.send('Please, fill all fields')
      }
    }

    await Recipe.update(req.body)

    return res.redirect(`/admin/recipes/${req.body.id}`)

  },
  async delete(req, res) {
    await Recipe.delete(req.body.id)

    return res.redirect("/admin/recipes")
  }
}

module.exports = controller