const { find } = require("filepond")
const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
  all(callback) {

    const query = `
      SELECT chefs.*, COUNT(recipes) as total_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY chefs.id, chefs.name, chefs.avatar_url, chefs.created_at
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
    INSERT INTO chefs (
      name,
      avatar_url,
      created_at 
    ) VALUES ( $1, $2, $3)
    RETURNING id
  `
    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows[0])
    });
  },
  find(id, callback) {

    const query = `SELECT chefs.*, COUNT(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE  chefs.id  = $1
      GROUP BY chefs.id, chefs.name, chefs.avatar_url, chefs.created_at
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows[0])
    })
  },
  findRecipe(id, callback) {
    db.query (`SELECT recipes.* FROM recipes WHERE recipes.chef_id=$1`, [id],
      (err, results) => {
        if (err) throw `Database error ${err}`
        callback(results.rows)
    })
  },
  update (data, callback) {

    const query = `
    UPDATE chefs SET
      name=($1),
      avatar_url=($2)
    WHERE id = $3
    `
    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  },
  delete (id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  }
}