const express = require("express")
const path = require("path")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const URI = process.env.MONGOOSE_URI

mongoose.connect(`mongodb://localhost:27017/${URI}`)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", () => {
  console.log("Connection to the database has been established!")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("login")
})

app.post("/", (req, res) => {
  const user = req.body.user
  console.log(user)
})

app.listen(3000)
