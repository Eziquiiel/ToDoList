const express = require("express");
const DB = require("./DB/conn");
const cors = require("cors");
const router = require("./Router/route");

const app = express();
app.use(cors());

app.use(express.json());
DB();

app.use("/", router);

app.listen(3000, () => {
  console.log("Servidor rodando ");
});
