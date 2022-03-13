require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const app = express();
const db = require("./db/db_configuration");

const pool = new Pool({
  database: "users",
});

// const PORT = 4000;
app.use(express.json());

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM domestic").then((result) => {
    res.send(result.rows);
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM domestic WHERE id = $1", [id]).then((result) => {
    res.send(result.rows[0]);
  });
});

app.post("/users", (req, res) => {
  const { name, age, city, pay_user } = req.body;
  pool
    .query(
      "INSERT INTO domestic(name, age, city, pay_user) VALUES($1, $2, $3, $4) RETURNING *",
      [name, age, city, pay_user]
    )
    .then((result) => res.send(result.rows));
});

app.patch("/users/:id", (req, res) => {
  const { name, age, city, pay_user } = req.body;
  const { id } = req.params;
  pool
    .query(
      `UDATE domestic SET
    name = COALESCE($1, name),
    age = COALESCE($2, age),
    city = COALESCE($3, city),
    pay_user = COALESCE($4, pay_user) 
    where id = $5
    RETURNING *`,
      [name, age, city, pay_user, id]
    )
    .then((result) => res.send(result.rows))
    .catch((err) => res.sendStatus(500));
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port", PORT);
});
