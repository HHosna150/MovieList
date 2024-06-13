import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movie from "./routes/movie.js";
import connection from "./db.js";

dotenv.config(); /* Load .env file contents into process.env */
//require('dotenv').config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

/* routes */
app.use("/movie", movie);

app.get("/user", (req, res) => {
  connection.query(`SELECT * FROM bookmarks`, (err, result) => {
    if (err) {
      console.error(err);
    }
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
