// "use strict";
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authPolic = require("./routes/authPolic");

///middleware & static files
app.use(express.static("public"));
app.use(express.json());

//register view engine
app.set("view engine", "ejs");
// app.set("views", 'partials')

/// connect to mongoDB
const dbURI =
  "mongodb+srv://aabbhhzz:A5610818@cluster0.daquq.mongodb.net/hospital";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(authPolic);
