import db from "../db/index.js";

// Funzione per convertire la convenzione snake_case del database in camelCase di JavaScript
function toOrder(row) {
  if (!row) return undefined;
  return {
    id: row.id,
    code: row.code,
    productName: row.product_name,
    quantity: row.quantity,
    priority: row.priority,
    createdAt: row.created_at,
  };
}

// Oggetto contenente le query SQL precompilate per le operazioni CRUD
const statements = {
  findAll: db.prepare(`
        SELECT * FROM orders ORDER BY created_at DESC, id DESC
    `),
  findById: db.prepare(`
        SELECT * FROM orders WHERE id = ?    
    `),
  insert: db.prepare(`
        INSERT INTO orders (code, product_name, quantity, priority)
        VALUES (@code, @productName, @quantity, @priority)    
    `),
  update: db.prepare(`
        UPDATE orders
        SET code = @code, product_name = @productName, quantity = @quantity, priority = @priority
        WHERE id = @id
    `),
  remove: db.prepare(`
        DELETE FROM orders WHERE id = ?    
    `),
};

// Funzioni per eseguire le operazioni CRUD
export function findAll() {
  return statements.findAll.all().map(toOrder);
}

export function findById(id) {
  return toOrder(statements.findById.get(id));
}

export function create(data) {
  const info = statements.insert.run(data);
  return findById(info.lastInsertRowid);
}

export function update(id, data) {
  const info = statements.update.run({ ...data, id });
  return info.changes === 0 ? undefined : findById(id);
}

export function remove(id){
    return statements.remove.run(id).changes > 0;
}
