require("dotenv").config();
const express = require("express");
const database = require("./database");
const { validateUser } = require("./validators")
const { validateMovie } = require("./validatars")
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite User list");
};
app.get("/", welcome);

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
app.get("/api/users/:id", getUserById);
app.get("/api/movies/:id", getMovieById);
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/users", validateUser, userHandlers.postUser);
app.put("/api/users/:id", userHandlers.updateUser);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});