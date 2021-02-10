import express from "express";
import dotenv from "dotenv";

dotenv.config()
const app = express();

app.use((req, res, next) => {
  res.write("Hello there\n")
  res.write(`${process.env.DUMMY_VALUE || "There's no dummy"}`)
  res.end()
});

app.listen(process.env.SERVER_PORT, () => console.log( "listening" ) );
