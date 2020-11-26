require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

//...
describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    let usersAtStart = await User.find({});
    usersAtStart = usersAtStart.map((u) => u.toJSON());

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    let usersAtEnd = await User.find({});
    usersAtEnd = usersAtEnd.map((u) => u.toJSON());
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContainEqual(newUser.username);
  });
  test("adding an already existing username fails", async () => {
    const newUser = {
      username: "root",
      name: "Matti Luukkainen",
      password: "salainen",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(async () => {
      await api
        .post("/api/users")
        .send(newUser)
        .toThrow(
          "User validation failed: username: Error, expected `username` to be unique. Value: `root`"
        );
    });
  });

  test("using a password shorter than 3 characters fails", async () => {
    const newUser = {
      username: "Instructor",
      name: "Obama Barrack",
      password: "sa",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(async () => {
      await api
        .post("/api/users")
        .send(newUser)
        .toThrow("password should be longer than 3");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
