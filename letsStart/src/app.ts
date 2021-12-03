import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

app.use(express.json());
app.get("/cats", (req: express.Request, res: express.Response) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/cats/:id", (req: express.Request, res: express.Response) => {
  try {
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

app.post("/cats/", (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/", (req: express.Request, res: express.Response) => {
  console.log(req.rawHeaders[1]);
  res.send({});
});

app.listen(8000, () => {
  console.log("server is on");
});