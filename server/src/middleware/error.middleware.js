// Intercetto qualsiasi richiesta che non ha trovato una route
export function notFoundHandler(req, res) {
  res
    .status(404)
    .json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Error handler centralizzato
export function errorHandler(err, req, res, next) {
  // controllo se il vincolo UNIQUE di code e' stato violato
  if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return res
      .status(409)
      .json({ error: "An order with this id already exists" });
  }

  
  
}
