import db from "./index.js";

// Array di ordini fittizzi da inserire nel database
const orders = [
  {
    code: "ORD-001",
    product_name: 'Monitor 27"',
    quantity: 12,
    priority: "Alta",
  },
  {
    code: "ORD-002",
    product_name: "Tastiera meccanica",
    quantity: 40,
    priority: "Media",
  },
  {
    code: "ORD-003",
    product_name: "Mouse wireless",
    quantity: 75,
    priority: "Bassa",
  },
  { code: "ORD-004", product_name: "Webcam HD", quantity: 8, priority: "Alta" },
  {
    code: "ORD-005",
    product_name: "Cavo HDMI 2m",
    quantity: 200,
    priority: "Bassa",
  },
];

// Query per inserire gli ordini nel database
const insert = db.prepare(`
    INSERT OR IGNORE INTO orders (code, product_name, quantity, priority)
    VALUES (@code, @product_name, @quantity, @priority)
`);

// Funzione per iterare sugli ordini fittizzi e inserirli nel database
const insertMany = db.transaction((rows) => {
  let inserted = 0;

  for (const row of rows) {
    const info = insert.run(row);
    inserted += info.changes;
  }

  return inserted;
});

// Eseguo l'inserimento degli ordini fittizzi nel database
const inserted = insertMany(orders);
console.log(`Seed: ${inserted}/${orders.length} ordini inseriti.`);
