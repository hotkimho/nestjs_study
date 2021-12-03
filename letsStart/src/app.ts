import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    this.app.use(express.json());

    this.setRoute();
    this.app.get("/", (req: express.Request, res: express.Response) => {
      console.log(req.rawHeaders[1]);
      res.send({});
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log("server is on");
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
