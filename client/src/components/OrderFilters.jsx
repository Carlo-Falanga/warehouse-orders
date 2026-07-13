export default function OrderFilters({
  search,
  priorityFilter,
  onSearchChange,
  onPriorityChange,
}) {
  return (
    <>
      <div>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cerca per codice"
        />
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="">Tutte le priorità</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Bassa">Bassa</option>
        </select>
      </div>
    </>
  );
}
