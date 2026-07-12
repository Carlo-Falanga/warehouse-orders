import { useEffect, useState } from "react";
import { getOrders } from "./api";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <>
      <div>
        <h1>Ordini di magazzino</h1>
        <table>
          <thead>
            <tr>
              <th>Codice</th>
              <th>Prodotto</th>
              <th>Quantita'</th>
              <th>Priorita'</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.code}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
