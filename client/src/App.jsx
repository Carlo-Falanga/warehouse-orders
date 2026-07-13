import { useEffect, useState } from "react";
import { createOrder, deleteOrder, getOrders, updateOrder } from "./api";
import OrderForm from "./components/OrderForm";
import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";



function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

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

  async function handleDelete(id) {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handlePriorityChange(order, newPriority) {
    try {
      const updated = await updateOrder(order.id, {
        code: order.code,
        productName: order.productName,
        quantity: order.quantity,
        priority: newPriority,
      });
      setOrders((prev) =>
        prev.map((element) => (element.id === order.id ? updated : element)),
      );
    } catch (err) {
      setError(err.message);
    }
  }

  const visibleOrders = orders.filter((order) => {
    const matchesCode = order.code.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      priorityFilter === "" || order.priority === priorityFilter;

    return matchesCode && matchesPriority;
  });

  return (
    <>
      <div>
        <h1>Ordini di magazzino</h1>

        <OrderForm onSubmit={handleSubmit} error={formError} />

        <OrderFilters
          search={search}
          priorityFilter={priorityFilter}
          onSearchChange={setSearch}
          onPriorityChange={setPriorityFilter}
        />

        {loading && <p>Caricamento ordini</p>}

        <OrdersTable
          orders={visibleOrders}
          onDelete={handleDelete}
          onPriorityChange={handlePriorityChange}
        />

        {!loading && visibleOrders.length === 0 && <p>Nessun ordine trovato</p>}
      </div>
    </>
  );
}

export default App;
