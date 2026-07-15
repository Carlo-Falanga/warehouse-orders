import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Ricreo il percorso del database in modo dinamico
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "..", "orders.db");

const db = new Database(DB_PATH);

// Modalita' WAL per migliorare le prestazioni del database
db.pragma("journal_mode = WAL");

// Funzione per inizializzare il database e creare la tabella degli ordini se non esiste
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
