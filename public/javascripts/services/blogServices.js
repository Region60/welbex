const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")
const user = require("./userServices")
const prisma = new PrismaClient()

const blog = {
  async addPost(post, authorName) {
    const { message, image, video } = post
    await prisma.post.create({
      data: {
        message,
        image,
        video,
        authorName,
      },
    })
  },

  async getPost(id) {
    const posts = await prisma.post.findUnique({ where: { id } })
    return posts
  },

  async getPosts(name) {
    const posts = await prisma.post.findMany({ where: { authorName: name } })
    return posts
  },

  async deletePost(id) {
    const response = await prisma.post.delete({ where: { id } })
    return { response }
  },

  async editPost(id, editData) {
    const { message, image, video } = editData
    const response = await prisma.post.update({
      where: { id },
      data: { message, image, video },
    })
    return response
  },
}

module.exports = blog
