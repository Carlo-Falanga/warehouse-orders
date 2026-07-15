import express from "express";
import cors from "cors";
import "./db/index.js";
import ordersRouter from "./routes/orders.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware globali
app.use(cors());
app.use(express.json());

// Helth check del server
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Route orders
app.use("/orders", ordersRouter);

// Middleware per la gestione errori
app.use(notFoundHandler);
app.use(errorHandler);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
