// Funzione per convertire la data del database nel formato gg/mm/aaaa
function formatDate(createdAt) {
  const [year, month, day] = createdAt.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}

export default function OrdersTable({ orders, onDelete, onPriorityChange }) {
  if (orders.length === 0) {
    return (
      <div className="text-center text-body-secondary py-5">
        <i className="bi bi-inbox fs-2 d-block mb-2" />
        <p className="mb-1">Nessun ordine trovato</p>
        <p className="small mb-0">
          Modifica i filtri o aggiungi un nuovo ordine
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table wo-table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" className="wo-label">
              Codice
            </th>
            <th scope="col" className="wo-label">
              Prodotto
            </th>
            <th scope="col" className="wo-label text-end">
              Quantità
            </th>
            <th scope="col" className="wo-label">
              Priorità
            </th>
            <th scope="col" className="wo-label d-none d-lg-table-cell">
              Creato
            </th>
            <th scope="col" aria-label="Azioni" />
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <span className="badge text-bg-light border text-nowrap">
                  {order.code}
                </span>
              </td>
              <td>{order.productName}</td>
              <td className="text-end fw-semibold wo-num">{order.quantity}</td>
              <td>
                <select
                  value={order.priority}
                  onChange={(e) => onPriorityChange(order, e.target.value)}
                  aria-label={`Priorità ordine ${order.code}`}
                  className={`form-select form-select-sm w-auto fw-semibold wo-priority-select wo-${order.priority.toLowerCase()}`}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Bassa">Bassa</option>
                </select>
              </td>
              <td className="d-none d-lg-table-cell text-body-secondary small wo-num">
                {formatDate(order.createdAt)}
              </td>
              <td className="text-end">
                <button
                  onClick={() => onDelete(order.id)}
                  aria-label={`Elimina ordine ${order.code}`}
                  title="Elimina"
                  className="btn btn-sm wo-btn-icon"
                >
                  <i className="bi bi-trash3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
