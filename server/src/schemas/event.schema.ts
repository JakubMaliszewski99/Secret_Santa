import { z } from "zod";

export const createEventSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Event name cannot be empty")
        .max(100, "Event name cannot exceed 100 characters"),
}).strict();