export default function OrderSearch({
  search,
  onSearchChange,
  visibleCount,
  totalCount,
}) {
  return (
    <div className="w-100 d-flex flex-column flex-sm-row align-items-sm-center gap-2">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cerca per codice"
        aria-label="Cerca per codice"
        className="form-control"
        style={{ maxWidth: "320px" }}
      />

      <span className="small text-body-secondary wo-num ms-sm-auto">
        {visibleCount} di {totalCount} ordini
      </span>
    </div>
  );
}
