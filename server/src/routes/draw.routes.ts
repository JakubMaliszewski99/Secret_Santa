import { Router } from "express";
import {
  getDraw,
  getDraws,
  postDraw,
} from "../controllers/draw.controller.js";

const router = Router();

router.get("/events/:eventId/draws", getDraws);
router.post("/events/:eventId/draws", postDraw);
router.get("/draws/:drawId", getDraw);

export default router;