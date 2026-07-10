// Intercetto qualsiasi richiesta che non ha trovato una route
export function notFoundHandler(req, res) {
  res
    .status(404)
    .json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Error handler centralizzato
export function errorHandler(err, req, res, next) {
  // controllo se il vincolo UNIQUE dato a code e' stato violato
  if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return res
      .status(409)
      .json({ error: "An order with this id already exists" });
  }

  // controllo se il vincolo CHECK dato a quantity ed a priority e' stato violato
  if (
    typeof err.code === "string" &&
    err.code.startsWith("SQLITE_CONSTRAINT")
  ) {
    return res
      .status(400)
      .json({ error: "Invalid order data: database constraint violated" });
  }
}
