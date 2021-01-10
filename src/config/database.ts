import { Request, Response, NextFunction } from "express";
import mongoose = require("mongoose");

class Database {
  private params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  private connected = 0;

  private db!: mongoose.Mongoose;

  private url = process.env.MONGO_URL || "";

  public connectMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.connect();
        next();
      } catch (err) {
        console.log(err, "[server]: error conntecting to database");
        next(err);
      }
    };
  }

  public async connect() {
    try {
      if (this.connected) {
        console.log("[server]: using existing database connection");
        return this.connected;
      }
      this.db = await mongoose.connect(this.url, this.params);
      this.connected = this.db.connections[0].readyState;

      return this.connected;
    } catch (e) {
      console.log("[server]: error conntecting to database", e);
      throw e;
    }
  }
}

const db = new Database();
db.connect();
export default db;
