export default function OrderForm({ onSubmit, error }) {
  return (
    <>
      <form onSubmit={onSubmit}>
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

      {error && <p>Errore: {error}</p>}
    </>
  );
}
