export default function OrdersTable({ orders, onDelete, onPriorityChange }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Codice</th>
            <th>Prodotto</th>
            <th>Quantita'</th>
            <th>Priorita'</th>
            <th>Azioni</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.code}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>
                <select
                  value={order.priority}
                  onChange={(e) => onPriorityChange(order, e.target.value)}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Bassa">Bassa</option>
                </select>
              </td>
              <td>
                <button onClick={() => onDelete(order.id)}>Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
