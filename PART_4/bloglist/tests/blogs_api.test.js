require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "FullStackOpen 2020",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com/",
    likes: 700001,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const authors = response.body.map((r) => r.author);
  expect(authors).toContainEqual("Matti Luukkainen");
});

test("there is an identifier defined upon creation", async () => {
  const response = await api.get("/api/blogs");
  const arraysOfId = response.body.map((r) => r.id);
  const id = arraysOfId[0];
  expect(id).toBeDefined();
});

describe("Testing scenerios for POST when", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "How to train a Foodie",
      author: "Robert Orazu",
      url: "https://foodnation.toBeMade/",
      likes: 1000000,
    };

    const login = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200);
    const token = await login.body.token;

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContainEqual("How to train a Foodie");
  });

  test("no likes property is added should default value to zero", async () => {
    const newBlog = {
      title: "the incredible sulk",
      author: "Precious Orazu",
      url: "https://womenwhosulk.toBeMade/",
    };

    const login = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200);
    const token = await login.body.token;

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const newlyCreated = response.body.find(
      (r) => r.title === "the incredible sulk"
    );

    expect(newlyCreated.likes).toBe(0);
  });

  test("no title and url property is included with the request, a status of 400 is returned", async () => {
    const newBlog = {
      author: "jonny depp",
      likes: 5,
    };

    const login = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200);
    const token = await login.body.token;

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});
describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const response = await api.get("/api/blogs");

    const blogToDelete = response.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
