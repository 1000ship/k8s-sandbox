const express = require('express')
const app = express()

app.use("/", (req, res, next) => {
  res.send("Hello")
})

app.listen(3000, "0.0.0.0", () => console.log( "listening"))