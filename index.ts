import express from "express";
import routes from "./src/routes";

class App {
  public app = express();
  public port = 8000;

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }

  constructor() {
    this.app.use(routes);
  }
}
const app = new App();
app.listen();
