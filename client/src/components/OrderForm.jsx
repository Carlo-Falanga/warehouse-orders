export default function OrderForm({ onSubmit, error }) {
  return (
    <div className="card shadow-sm overflow-hidden sticky-xl-top">
      <div className="card-header wo-card-header d-flex align-items-center bg-transparent border-bottom py-3">
        <h2 className="h6 fw-semibold mb-0">Nuovo ordine</h2>
      </div>

      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label
              htmlFor="code"
              className="form-label small text-body-secondary mb-1"
            >
              Codice
            </label>
            <input
              id="code"
              name="code"
              placeholder="es. ORD-006"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="productName"
              className="form-label small text-body-secondary mb-1"
            >
              Prodotto
            </label>
            <input
              id="productName"
              name="productName"
              className="form-control"
            />
          </div>

          <div className="row g-2 mb-3">
            <div className="col-6">
              <label
                htmlFor="quantity"
                className="form-label small text-body-secondary mb-1"
              >
                Quantità
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label
                htmlFor="priority"
                className="form-label small text-body-secondary mb-1"
              >
                Priorità
              </label>
              <select
                id="priority"
                name="priority"
                defaultValue="Alta"
                className="form-select"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Bassa">Bassa</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Aggiungi ordine
          </button>
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
