const blogsRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  let blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  });

  try {
    console.log("try working");
    const savedBlog = await blog.save();
    response.json(savedBlog);
  } catch (error) {
    next(error);
    console.log("catch working");
  }
});

blogsRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// blogsRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const blog = {
//     title: body.title,
//     author: body.author,
//   }

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then(updatedBlog => {
//       response.json(updatedBlog)
//     })
//     .catch(error => next(error))
// })

module.exports = blogsRouter;
