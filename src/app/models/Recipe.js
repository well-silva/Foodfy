const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
  all(callback) {

    const query = `
      SELECT recipes.*, chefs.name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows)
    });

  },
  create(data, callback) {

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

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows[0])
    });
  },
  find(id, callback) {
    db.query(`SELECT recipes.*, chefs.name
    FROM recipes 
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1`, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows[0])
    })
  },
  update(data, callback) {
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

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, (err, results) => {
      if (err) throw `Database Error ${err}`

      callback(results.rows)
    })
  }
}