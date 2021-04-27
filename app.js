const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.set('view engine', 'njk')

nunjucks.configure("views", {
    express: app,
    noCache: true
})

app.listen(5000, () => console.log('Servidor está rodando'))