  const bcrypt = require("bcryptjs")
  const generateToken = require("../jwt/jwtToken")
  const { PrismaClient } = require("@prisma/client")
  const prisma = new PrismaClient()

  const auth = {
    async login(loginDate) {
      const { email, password } = loginDate
      const candidate = await prisma.user.findUnique({ where: { email } })
      if (!candidate) {
        return {
          message: "Неправильный email или пароль",
        }
      }
      return bcrypt.compare(password, candidate.password).then(function (valid) {
        if (valid) {
          const token = generateToken(candidate)
          return {
            token,
          }
        }
        return {
          message: "Неправильный email или пароль",
        }
      })
    },
  }

  module.exports = auth
