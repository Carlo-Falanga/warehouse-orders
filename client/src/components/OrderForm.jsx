export default function OrderForm({ onSubmit, error }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h2 className="h6 text-uppercase text-muted fw-semibold mb-3">
          Nuovo ordine
        </h2>
        <form onSubmit={onSubmit}>
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md">
              <label className="form-label small mb-1">Codice</label>
              <input
                name="code"
                placeholder="Codice"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md">
              <label className="form-label small mb-1">Prodotto</label>
              <input
                name="productName"
                placeholder="Prodotto"
                className="form-control"
              />
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label small mb-1">Quantità</label>
              <input
                name="quantity"
                type="number"
                placeholder="Quantità"
                className="form-control"
              />
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label small mb-1">Priorità</label>
              <select
                name="priority"
                defaultValue="Alta"
                className="form-select"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Bassa">Bassa</option>
              </select>
            </div>
            <div className="col-12 col-md-auto">
              <button type="submit" className="btn btn-primary w-100">
                Aggiungi ordine
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">
            Errore: {error}
          </div>
        )}
      </div>
    </div>
  );
}
