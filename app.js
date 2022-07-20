const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const exphbs = require("express-handlebars")
const Handlebars = require("handlebars")
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access")

const app = express()
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
})
Handlebars.registerHelper("isEditeAndId", function (v1, v2,v3, options) {
  if (v1 && v2===v3) {
    return options.fn(this)
  }
  return options.inverse(this)
})

const homeRouter = require("./routes/index")
const profileRouter = require("./routes/profile")
const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "./views")
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

app.use("/", homeRouter)
app.use("/profile", profileRouter)
app.use("/user", userRouter)
app.use("/blog", blogRouter)

module.exports = app
