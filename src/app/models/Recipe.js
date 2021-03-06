const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
  all() {

    const query = `
      SELECT recipes.*, chefs.name as chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    `

    return db.query(query);
  },
  create(data) {

    const query = `
    INSERT INTO recipes (
      image,
      title,
      ingredients,
      preparation,
      information,
      created_at,
      chef_id
    ) VALUES ( $1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `
    const values = [
      data.image_recipe,
      data.title_recipe,
      data.ingredients,
      data.preparations,
      data.informationAdditional,
      date(Date.now()).iso,
      data.chef
    ]

   return db.query(query, values);
  },
  find(id) {

    return db.query(`SELECT recipes.*, chefs.name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1`, [id])
  },
  update(data) {
    const query = `
    UPDATE recipes SET
      image=($1),
      title=($2),
      ingredients=($3),
      preparation=($4),
      information=($5),
      chef_id=($6)
    WHERE id = $7
    `
    const values = [
      data.image_recipe,
      data.title_recipe,
      data.ingredients,
      data.preparations,
      data.informationAdditional,
      data.chef,
      data.id
    ]

    return db.query(query, values)
  },
  delete(id) {
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
  },
  chefsSelectOptions() {
    return db.query(`SELECT name, id FROM chefs`)
  },
  findBy(filter) {
    return db.query(`SELECT recipes.*, chefs.name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.title ILIKE '%${filter}%'`)
  }
}