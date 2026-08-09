import { useEffect, useState } from "react";
import { createOrder, deleteOrder, getOrders, updateOrder } from "./api";
import Sidebar from "./components/Sidebar";
import OrderForm from "./components/OrderForm";
import OrderSearch from "./components/OrderSearch";
import OrdersTable from "./components/OrdersTable";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Carica gli ordini dal server quando il componente viene montato
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

  // Funzione per gesitre l'invio del form di creazione di un nuovo ordine
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

  // Funzione per gestire l'eliminazione di un ordine
  async function handleDelete(id) {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // Funzione per gestire il cambiamento della priorita' di un ordine
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

  // Filtra gli ordini in base al codice e alla priorita' selezionata
  const visibleOrders = orders.filter((order) => {
    const matchesCode = order.code.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      priorityFilter === "" || order.priority === priorityFilter;

    return matchesCode && matchesPriority;
  });

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100">
      <Sidebar
        orders={orders}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <main className="flex-grow-1 px-3 px-lg-5 py-4 py-lg-5">
        <div className="mx-auto" style={{ maxWidth: "1180px" }}>
          <header className="mb-4">
            <h1 className="h4 fw-semibold mb-1">Ordini di magazzino</h1>
            <p className="text-body-secondary mb-0">
              Gestisci gli ordini, filtra per codice e imposta le priorità
            </p>
          </header>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="row g-4">
            <div className="col-12 col-xl-8">
              <div className="card shadow-sm overflow-hidden">
                <div className="card-header wo-card-header d-flex align-items-center bg-transparent border-bottom py-3">
                  <OrderSearch
                    search={search}
                    onSearchChange={setSearch}
                    visibleCount={visibleOrders.length}
                    totalCount={orders.length}
                  />
                </div>

                {loading ? (
                  <div className="d-flex align-items-center justify-content-center gap-2 text-body-secondary py-5">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                    <span>Caricamento ordini…</span>
                  </div>
                ) : (
                  <OrdersTable
                    orders={visibleOrders}
                    onDelete={handleDelete}
                    onPriorityChange={handlePriorityChange}
                  />
                )}
              </div>
            </div>

            <div className="col-12 col-xl-4">
              <OrderForm onSubmit={handleSubmit} error={formError} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
