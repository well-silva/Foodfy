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

      return res.render("admin/chefs/show", { chef })
    })
  }
}

module.exports = controller