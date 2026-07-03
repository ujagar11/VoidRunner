const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const dns = require("node:dns");

const routes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const DBConnection = require("./database/db");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(mongoSanitize({
//   onSanitize: ({ req, key }) => {
//     console.warn(`Sanitized: ${key} in request`);
//   }
// }));

app.get("/", (req, res) => {
  res.send(">_ VoidRunner API is running");
});

app.use("/", routes);
app.use("/problems", problemRoutes);
app.use("/", submissionRoutes);

DBConnection().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});