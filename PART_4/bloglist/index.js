require("dotenv").config();

const app = require("./app");
const http = require("http");
// const config = require('./utils/config')
// const logger = require("./utils/logger");

const server = http.createServer(app);

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ├── index.js
// ├── app.js
// ├── build
// │   └── ...
// ├── controllers
// │   └── notes.js
// ├── models
// │   └── note.js
// ├── package-lock.json
// ├── package.json
// ├── utils
// │   ├── config.js
// │   ├── logger.js
// │   └── middleware.js
