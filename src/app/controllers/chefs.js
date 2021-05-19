const Chef = require("../models/Chef")

const controller = {
  async index(req, res) {
    const results = await Chef.all()
    const chefs = results.rows

    return res.render("admin/chefs/index", { chefs })
  },
  create: (req, res) => {
    return res.render("admin/chefs/create")
  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys){
      if(req.body[key] == ""){
        return res.send('Please, fill all fields')
      }
    }

    let results = await Chef.create(req.body)

    const chefId = results.rows[0].id
    
    return res.redirect(`/admin/chefs/${chefId}`)

  },
  async show(req, res) {

    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    if(!chef) return res.send('Chef not found')

    results = await Chef.findRecipe(req.params.id)
    const recipes = results.rows

    return res.render("admin/chefs/show", { chef, recipes })

  },
  async edit(req, res) {

    const results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    return res.render("admin/chefs/edit", { chef } )
  },
  async put(req, res) {

    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == ""){
        res.send('Preencha todos os dados')
      }
    }

    await Chef.update(req.body)

    return res.redirect(`/admin/chefs/${req.body.id}`)
  },
  async delete(req, res){
    await Chef.delete(req.body.id)

    return res.redirect("/admin/chefs")
  }
}

module.exports = controller