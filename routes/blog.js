const express = require("express")
const auth = require("../middleware/auth")
const router = express.Router()
const blog = require("../public/javascripts/services/blogServices")

router.get("/", auth, async (req, res) => {
  try {
    const posts = await blog.getPosts(req.userAuth.name)
    res.render("blog", {
      title: "Blog",
      isBlog: true,
      posts,
      isLogin: req.cookies.access_token,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/add", auth, async (req, res) => {
  try {
    await blog.addPost(req.body, req.userAuth.name)
    res.status(200).redirect("/blog")
  } catch (e) {
    console.log(e)
  }
})

router.post("/delete/:id", async (req, res) => {
  try {
    const response = await blog.deletePost(+req.params.id)
    console.log(response)
    res.status(200).redirect("/blog")
  } catch (error) {
    console.log(error)
  }
})

router.get("/post/:id", async (req, res) => {
  try {
    const post = await blog.getPost(+req.params.id)

    res.render("post", { title: "Редактирование поста", post })
  } catch (error) {
    console.log(error)
  }
})

router.post("/edit/:id", async (req, res) => {
  try {
    const response = await blog.editPost(+req.params.id, req.body)
    console.log(response)
    res.status(200).redirect("/blog")
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
