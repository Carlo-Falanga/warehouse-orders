import db from "../db/index.js";

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

