import type { Request, Response, NextFunction } from "express";

import {
    getAllEvents,
    createEvent,
} from "../services/event.service.js";

import { createEventSchema } from "../schemas/event.schema.js";

export async function getEvents(
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const events = await getAllEvents();

        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export async function postEvent(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const validation = createEventSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                error: "Validation failed",
                details: validation.error.flatten(),
            });
            return;
        }

        const event = await createEvent(validation.data.name);

        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
}