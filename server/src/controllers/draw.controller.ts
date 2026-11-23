import type { Request, Response } from "express";
import {
  createDraw,
  getDrawById,
  getDrawsForEvent,
} from "../services/draw.service.js";
import {
  createDrawSchema,
  uuidSchema,
} from "../schemas/draw.schema.js";

export async function getDraws(req: Request, res: Response) {
  const eventId = uuidSchema.safeParse(req.params.eventId);

  if (!eventId.success) {
    return res.status(400).json({ error: "Invalid event ID" });
  }

  try {
    const draws = await getDrawsForEvent(eventId.data);

    if (draws === null) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.json(draws);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function postDraw(req: Request, res: Response) {
  const eventId = uuidSchema.safeParse(req.params.eventId);
  const body = createDrawSchema.safeParse(req.body);

  if (!eventId.success) {
    return res.status(400).json({ error: "Invalid event ID" });
  }

  if (!body.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: body.error.issues,
    });
  }

  try {
    const draw = await createDraw(eventId.data, body.data.name);

    if (draw === null) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(201).json(draw);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getDraw(req: Request, res: Response) {
  const drawId = uuidSchema.safeParse(req.params.drawId);

  if (!drawId.success) {
    return res.status(400).json({ error: "Invalid draw ID" });
  }

  try {
    const draw = await getDrawById(drawId.data);

    if (!draw) {
      return res.status(404).json({ error: "Draw not found" });
    }

    return res.json(draw);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}