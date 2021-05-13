const express = require('express')
const routes = express.Router()
const guestController  = require('./app/controllers/guest')
const recipesController = require('./app/controllers/recipes')
const chefsController = require('./app/controllers/chefs')

routes.get('/', (req, res) => res.redirect('index'))

routes.get('/index', guestController.index)
routes.get('/about', guestController.about)
routes.get('/recipes', guestController.recipes)
routes.get('/recipes/:id', guestController.show)
routes.get('/chefs', guestController.chefs)
routes.get('/seach', guestController.seach)

routes.get("/admin/recipes", recipesController.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipesController.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipesController.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipesController.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipesController.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipesController.put); // Editar uma receita
routes.delete("/admin/recipes", recipesController.delete); // Deletar uma receita

routes.get("/admin/chefs", chefsController.index); // Mostrar a lista de receitas
routes.get("/admin/chefs/create", chefsController.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/:id", chefsController.show); // Exibir detalhes de uma receita
routes.get("/admin/chefs/:id/edit", chefsController.edit); // Mostrar formulário de edição de receita
routes.post("/admin/chefs", chefsController.post); // Cadastrar nova receita
routes.put("/admin/chefs", chefsController.put); // Editar uma receita
routes.delete("/admin/chefs", chefsController.delete); // Deletar uma receita

module.exports = routes