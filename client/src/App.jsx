import { useEffect, useState } from "react";
import { createOrder, getOrders } from "./api";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    const formEl = e.target;
    const data = new FormData(formEl);

    try {
      const created = await createOrder({
        code: data.get("code"),
        productName: data.get("productName"),
        quantity: Number(data.get("quantity")),
        priority: data.get("priority"),
      });

      setOrders((prev) => [created, ...prev]);
      formEl.reset();
    } catch (err) {
      setFormError(err.message);
    }
  }

  return (
    <>
      <div>
        <h1>Ordini di magazzino</h1>

        <form onSubmit={handleSubmit}>
          <input name="code" placeholder="Codice" />
          <input name="productName" placeholder="Prodotto" />
          <input name="quantity" type="number" placeholder="Quantità" />
          <select name="priority" defaultValue="Alta">
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Bassa">Bassa</option>
          </select>
          <button type="submit">Aggiungi ordine</button>
        </form>

        {loading && <p>Caricamento ordini</p>}

        {error && <p>Errore: {error}</p>}

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
