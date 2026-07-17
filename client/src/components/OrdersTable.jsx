export default function OrdersTable({ orders, onDelete, onPriorityChange }) {
  if (orders.length === 0) {
    return null;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Codice</th>
              <th scope="col">Prodotto</th>
              <th scope="col" className="text-end">
                Quantità
              </th>
              <th scope="col">Priorità</th>
              <th scope="col" className="text-end">
                Azioni
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="fw-semibold">{order.code}</td>
                <td>{order.productName}</td>
                <td className="text-end">{order.quantity}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge rounded-pill text-bg-light border priority-badge">
                      {order.priority}
                    </span>
                    <select
                      value={order.priority}
                      onChange={(e) => onPriorityChange(order, e.target.value)}
                      className="form-select form-select-sm w-auto"
                    >
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Bassa">Bassa</option>
                    </select>
                  </div>
                </td>
                <td className="text-end">
                  <button
                    onClick={() => onDelete(order.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
