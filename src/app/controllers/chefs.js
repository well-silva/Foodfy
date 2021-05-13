const Chef = require("../models/Chef")

const controller = {
  index: (req, res) => {

    Chef.all((chefs) => {
      return res.render("admin/chefs/index", {chefs})
    })
  },
  create: (req, res) => {
    return res.render("admin/chefs/create")
  },
  post: (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys){
      if(req.body[key] == ""){
        return res.send('Please, fill all fields')
      }
    }

    Chef.create(req.body, (chef) => {
      return res.redirect("/admin/chefs")
    })
  },
  show: (req, res) => {

    Chef.find(req.params.id, (chef) => {
      if(!chef) return res.send('Chef not found')

      Chef.findRecipe(req.params.id, (recipes) => {
        return res.render("admin/chefs/show", { chef, recipes })
      })
    })
  },
  edit: (req, res) => {
    Chef.find(req.params.id, (chef) => {

      return res.render("admin/chefs/edit", { chef } )
    })
  },
  put: (req, res) => {

    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == ""){
        res.send('Preencha todos os dados')
      }
    }

    console.log(req.body)

    Chef.update(req.body, () => {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete: (req, res) => {
    Chef.delete(req.body.id, (chef) => {
      return res.redirect("/admin/chefs")
    })
  }
}

module.exports = controller