const key = require("../key/index")
const jwt = require("jsonwebtoken")

function auth(req, res, next) {
  try {
    const token = req.cookies.access_token
    if (!token) {
      return res.render("register", {
        title: "Register",
        isLogin: req.cookies.access_token,
        isRegister: true,
        user: req.userAuth,
      })
    }

    jwt.verify(token, key.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "выполните вход",
        })
      } else {
        req.userAuth = decoded

        next()
      }
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = auth
