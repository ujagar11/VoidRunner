const express = require("express");
const routes = require("./routes/authRoutes");
const DBConnection = require("./database/db");
const problemRoutes = require("./routes/problemRoutes");
const dns = require('node:dns');
const submissionRoutes = require("./routes/submissionRoutes");

dns.setServers(['1.1.1.1', '8.8.8.8']);


//middleware
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("hey neymar its sunny init?");
});

DBConnection();
app.use("/", routes);

app.use("/problems", problemRoutes);
app.use("/", submissionRoutes);

app.listen(3000, () => {
  console.log("server is running");
});
