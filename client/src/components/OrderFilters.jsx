export default function OrderFilters({
  search,
  priorityFilter,
  onSearchChange,
  onPriorityChange,
}) {
  return (
    <div className="row g-2 mb-3">
      <div className="col-12 col-sm">
        <div className="input-group">
          <span className="input-group-text bg-white">
            <i className="bi bi-search" />
          </span>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cerca per codice"
            className="form-control"
          />
        </div>
      </div>
      <div className="col-12 col-sm-auto">
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="form-select"
        >
          <option value="">Tutte le priorità</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Bassa">Bassa</option>
        </select>
      </div>
    </div>
  );
}
