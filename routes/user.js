const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator/validator")
const auth = require("../public/javascripts/services/authServices")

const user = require("../public/javascripts/services/userServices")

router.get("/", async (req, res) => {
  try {
    res.render("login", { title: "Login", isLogin: req.cookies.access_token })
  } catch (error) {
    console.log(error)
  }
})

router.post("/register", validator, async (req, res) => {
  try {
    const { message } = await user.registartion(req.body)
    return res.status(200).render("register", { message })
  } catch (e) {
    console.log(e)
  }
})

router.post("/login", async (req, res) => {
  try {
    const response = await auth.login(req.body)
    return response.token
      ? res
          .cookie("access_token", response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .redirect("/")
      : res.status(401).render("login", { message: response.message })
  } catch (e) {
    console.log(e)
  }
})

router.post("/logout", async (req, res) => {
  try {
    res.cookie("access_token", "").status(200).redirect("/")
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
