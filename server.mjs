// Imports
import express from "express";
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import error from './utilities/error.mjs'

// Setups
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});
const apiKeys = ['perscholas']
app.use("/api", function (req, res, next) {
  var key = req.query["api-key"];

  if (!key) {
    // return res.status(400).json({ error: "API Key required"});
    next(error(400, "API Key Required"))
  }

  if (apiKeys.indexOf(key) === -1) {
    // return res.status(401).json({error: "Invalid API Key"})
    next(error(401, "Invalid API Key"))
  }

  req.key = key;
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/users/:id",
        rel: "users",
        type: "PATCH",
      },
      {
        href: "api/users/:id",
        rel: "users",
        type: "DELETE",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "POST",
      },
      {
        href: "api/posts/:id",
        rel: "posts",
        type: "PATCH",
      },
      {
        href: "api/posts/:id",
        rel: "posts",
        type: "DELETE",
      },
    ],
  });
});

// Global Err Handling
app.use((req, res) => {
  // res.status(404).json({ msg: "Resource Not Found" });
  next(error(404, "Resource Not Found"))
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ msg: err.message });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});