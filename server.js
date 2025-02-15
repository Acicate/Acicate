const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gamification",
  password: "tu_contraseña",
  port: 5432,
});

app.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)",
      [nombre, email, password]
    );
    res.json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
