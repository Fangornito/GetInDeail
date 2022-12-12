const database = require("./database");
const deleteUser = (req, res) => {

  const id = parseInt(req.params.id);


  database

    .query("delete from users where id = ?", [id])

    .then(([result]) => {

      if (result.affectedRows === 0) {

        res.status(404).send("Not Found");

      } else {

        res.sendStatus(204);

      }

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error deleting the user");

    });

};
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;
  
  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the users");
    });

};
const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users( firstname, lastname, email, city, language) VALUES ( ?, ?, ?, ?, ?)",
      [ firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the users");
    });
};

const getUsers = (req, res) => {
 let sql = "select * from users";
 const sqlValues= [];
 if(req.query.language != null){
  sql += " where language = ?";
  sqlValues.push(req.query.language)
 }
 if(req.query.city != null){
  sql += " where city = ?";
  sqlValues.push(req.query.city)
 }
  database
  .query(sql, sqlValues)
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data");
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (user != null) {
    res.json(user);
  } else {
    res.status(404).send("Not Found");
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  postUser, // don't forget to export your function ;)
  deleteUser,
};