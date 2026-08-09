const filters = [
  { value: "", label: "Tutti" },
  { value: "Alta", label: "Alta" },
  { value: "Media", label: "Media" },
  { value: "Bassa", label: "Bassa" },
];

// Funzione per contare gli ordini di una priorita', o tutti se non e' indicata
function countOrders(orders, priority) {
  if (priority === "") return orders.length;
  return orders.filter((order) => order.priority === priority).length;
}

export default function Sidebar({ orders, priorityFilter, onPriorityChange }) {
  return (
    <aside className="wo-sidebar d-flex flex-column gap-3 p-3 p-lg-4 pt-lg-5">
      <div className="d-flex align-items-center gap-2 text-white">
        <i className="bi bi-box-seam fs-5" />
        <span className="fw-semibold">Warehouse Orders</span>
      </div>

      <p className="wo-label d-none d-lg-block mb-0 mt-3">Priorità</p>

      <nav className="nav nav-pills wo-nav flex-lg-column gap-1">
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => onPriorityChange(filter.value)}
            aria-pressed={priorityFilter === filter.value}
            className={`nav-link d-flex align-items-center gap-3 px-2 px-lg-3 ${
              priorityFilter === filter.value ? "active" : ""
            }`}
          >
            <span className="flex-grow-1 text-start">{filter.label}</span>
            <span className="wo-num small opacity-75">
              {countOrders(orders, filter.value)}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
