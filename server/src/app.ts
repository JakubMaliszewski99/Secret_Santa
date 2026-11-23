import express from "express";
import cors from "cors";

import eventRoutes from "./routes/event.routes.js"
import drawRoutes from "./routes/draw.routes.js"

export const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        message: "Secret Santa API is running!"
    });
});

// Event routes
app.use("/api/events", eventRoutes);

// Draw routes
app.use("/api", drawRoutes);