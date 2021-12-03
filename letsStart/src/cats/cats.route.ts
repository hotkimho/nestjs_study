import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import {
  createCat,
  deleteCat,
  patchCat,
  putCat,
  readAllcat,
  readCat,
} from "./cats.service";

const router = Router();
router.get("/cats", readAllcat);
router.get("/cats/:id", readCat);
router.post("/cats/", createCat);
router.put("/cats/:id", putCat);
router.patch("/cats/:id", patchCat);
router.delete("/cats/:id", deleteCat);
export default router;
