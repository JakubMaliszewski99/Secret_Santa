import { z } from "zod";

export const createDrawSchema = z.object({
    name: z.string().trim().min(1).max(100).optional(),
}).strict();

export const uuidSchema = z.string().uuid();