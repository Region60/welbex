const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const user = {
  async registartion(regData) {
    const { name, email, password } = regData
    const candidate = await prisma.user.findUnique({ where: { email } })
    if (candidate) {
      console.log(`Пользователь c ${email} найден`)
      return {
        message: `Пользователь с ${email} уже существует`,
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      })
      return {
        message: "Пользователь создан",
      }
    }
  },

  async getUser(email) {
    const candidate = await prisma.user.findUnique({
      where: { email },
    })
    if (!candidate) {
      return {
        message: "Такого пользователя не существует",
      }
    }
    const { password, ...data } = candidate
    return {
      data,
    }
  },

  async getUsers(page, quantity) {
    const users = await prisma.user.findMany({
      skip: page * quantity - quantity,
      take: quantity,
      orderBy: {
        registerdate: "asc",
      },
    })
    return {
      code: 200,
      users,
    }
  },
}

module.exports = user
