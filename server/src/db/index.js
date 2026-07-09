import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "..", "orders.db");

const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");

export function initDb() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        code         TEXT    NOT NULL UNIQUE,
        product_name TEXT    NOT NULL,
        quantity     INTEGER NOT NULL CHECK (quantity > 0),
        priority     TEXT    NOT NULL CHECK (priority IN ('Alta', 'Media', 'Bassa')),
        created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
        );
    `);
}

initDb();

export default db;
