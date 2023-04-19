require('dotenv').config();

const express = require("express");
var cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();
app.use(cors());
app.use(express.json());
dbConnection();

app.use('/api/users', require('./routes/users.router'))
app.use('/api/login', require('./routes/auth.router'))
const PORT = process.env.PORT;

// app.get("/api/", (req, res) => {
//   res.status(200).json({
//     ok: true,
//     msg: "Hello!",
//   });
// });

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto", PORT);
});
