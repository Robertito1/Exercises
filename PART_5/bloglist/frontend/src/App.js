import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification/Notification";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(true);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => blogs.sort((a, b) => a.likes - b.likes))
      .then((blogs) => blogs.reverse())
      .then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNotificationStatus(true);
      setNotificationMessage(
        `A new Blog ${blogObject.title} by ${blogObject.author} added`
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const handleDeleteOf = (blog) => {
    const idOfDeletedBlog = blog.id;
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}? `)) {
      blogService.discard(idOfDeletedBlog).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== idOfDeletedBlog));
        setNotificationStatus(true);
        setNotificationMessage(`${blog.title} by ${blog.author} was deleted`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setNotificationStatus(true);
      setNotificationMessage(`${user.name} Logged in`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
      setNotificationStatus(false);
      setNotificationMessage("Wrong Username or password");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const handleLogout = async () => {
    await window.localStorage.removeItem("loggedBlogappUser");
    setNotificationStatus(true);
    setNotificationMessage(`${user.name} Logged out`);
    await setUser(null);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    );
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    );
  };
  return (
    <div>
      <h2>blogs</h2>
      {notificationMessage === null ? null : (
        <Notification
          message={notificationMessage}
          status={notificationStatus}
        />
      )}
      {user ? (
        <div id="blogs">
          <p>
            {user.name} logged-in
            <span>
              <button onClick={handleLogout}>logout</button>
            </span>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleDelete={handleDeleteOf}
              user={user}
            />
          ))}
        </div>
      ) : (
        loginForm()
      )}
    </div>
  );
};

export default App;
