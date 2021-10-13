const express = require("express")
const path = require("path")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect(`mongodb://localhost:27017/mock-users`)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", () => {
  console.log("Connection to the database has been established!")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const User = mongoose.model("User", UserSchema)

app.get("/", (req, res) => {
  res.render("login")
})

app.get("/user/:id", async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.render("main", { user })
})

app.post("/", async (req, res) => {
  const user = new User(req.body.user)
  console.log(user)
  await user.save()
  res.redirect(`/user/${user._id}`)
})

app.listen(3000)
