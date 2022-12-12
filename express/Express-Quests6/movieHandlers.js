const database = require("./database");
const deleteMovie = (req, res) => {

  const id = parseInt(req.params.id);


  database

    .query("delete from movies where id = ?", [id])

    .then(([result]) => {

      if (result.affectedRows === 0) {

        res.status(404).send("Not Found");

      } else {

        res.sendStatus(204);

      }

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error deleting the movie");

    });

};
const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  
  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
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
      res.status(500).send("Error editing the movies");
    });

};
const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies( title, director, year, color, duration) VALUES ( ?, ?, ?, ?, ?)",
      [ title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movies");
    });
};

const getMovies = (req, res) => {
  database
  .query("select * from users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data");
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  const movie = movies.find((movie) => movie.id === id);

  if (movie != null) {
    res.json(movie);
  } else {
    res.status(404).send("Not Found");
  }
};

module.exports = {
  getMovies,
  getMovieById,
  updateMovie,
  postMovie, // don't forget to export your function ;)
  deleteMovie,
};