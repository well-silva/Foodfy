const { find } = require("filepond")
const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
  all(callback) {

    const query = `
      SELECT chefs.*, count(recipes) as total_recipes
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
    db.query(`SELECT chefs.*, recipes.*
    FROM chefs 
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    WHERE chefs.id = $1`, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows[0])
    })
  }
}