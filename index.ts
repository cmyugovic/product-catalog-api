require("dotenv").config();
import express from "express";
import routes from "./src/routes";
require("./src/config/database");
import cors = require("cors");
import bodyParser = require("body-parser");

class App {
  public app = express();
  public port = process.env.PORT || 8000;

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }

  constructor() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(routes);
  }
}
const app = new App();
app.listen();
