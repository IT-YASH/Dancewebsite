const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const port = 80;

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/contactform");
}

//defining schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
});

const contact = mongoose.model("contact", contactSchema);

app.use("/static", express.static("static"));
app.use(express.urlencoded());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});

// app.get("/home", (req, res) => {
//   const params = {};  
//   res.status(200).render("home.pug", params);
// });

app.get("/contact", (req, res) => {
  const params = {};  
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var mydata = new contact(req.body);
  mydata.save().then(()=>{
    res.send("this item has been saved to database");
  }).catch(()=>{
    res.status(404).send("item was not saved to the database");
  })

  // res.status(200).render("contact.pug");
});

app.listen(port, () => {
  console.log(`the application successfully started on port ${port}`);
});
