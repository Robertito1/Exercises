import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const raiseLoginEvent = (e) => {
    e.preventDefault();
    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={raiseLoginEvent}>
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

export default Login;
