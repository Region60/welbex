const express = require("express")
const auth = require("../middleware/auth")
const router = express.Router()

router.get("/", auth, async (req, res) => {
  try {
    res.render("register", {
      title: "Register",
      isLogin: req.cookies.access_token,
      isRegister: true,
      user: req.userAuth,
    })
  } catch (error) {
    console.log(error)
  }
})
  
module.exports = router
