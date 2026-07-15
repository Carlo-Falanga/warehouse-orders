# Warehouse Orders

Applicazione full stack per la gestione di ordini di magazzino, sviluppata come prova tecnica.

Permette di visualizzare la lista degli ordini, aggiungerne di nuovi tramite form, cercare per codice, filtrare per priorità, cambiare la priorità di un ordine ed eliminarlo.

## Tecnologie

- Backend: Node.js, Express 5, SQLite (better-sqlite3), Zod per la validazione, CORS
- Frontend: React 19 con Vite, Bootstrap 5 per lo stile

## Avvio

Serve Node.js 20 o superiore. Backend e frontend vanno avviati in due terminali separati.

Backend:

```bash
cd server
npm install
npm run seed
npm run dev
```

L'API parte su http://localhost:3000. Il comando `seed` inserisce 5 ordini di esempio: serve perché il file del database non è versionato e viene creato vuoto al primo avvio.

Frontend:

```bash
cd client
npm install
npm run dev
```

Vite indica nel terminale l'indirizzo su cui aprire l'app. Il backend deve essere già in esecuzione: gira su una porta diversa, quindi il server abilita CORS per accettare le richieste del client.

## Endpoint

- `GET /orders` — lista ordini
- `GET /orders/:id` — singolo ordine
- `POST /orders` — crea un ordine
- `PUT /orders/:id` — aggiorna un ordine
- `DELETE /orders/:id` — elimina un ordine
- `GET /health` — health check del server

Un ordine ha: id, code (univoco), productName, quantity (intero positivo), priority (Alta / Media / Bassa), createdAt.

## Scelte progettuali

Ho organizzato il backend in tre livelli: le route definiscono gli endpoint, i controller gestiscono input e status HTTP, e il repository è l'unico modulo che contiene query SQL nel flusso delle richieste HTTP. In questo modo le query si trovano tutte in un posto solo.

La validazione avviene in due punti. Zod valida il body delle richieste in un middleware, con schema strict (rifiuta campi non previsti). Il database ha comunque i suoi vincoli (UNIQUE sul codice, CHECK su quantità e priorità), che proteggono anche le scritture che non passano dall'API, come lo script di seed. Zod intercetta ad esempio una quantità decimale come 10.5, cosa che il CHECK del database accetterebbe.

Gli errori sono gestiti in un unico punto, un middleware registrato per ultimo. Ci arrivano in due modi. Il primo è esplicito: la validazione Zod fallisce dentro il middleware `validate`, che passa l'errore avanti con `next(err)`. Il secondo è implicito: le violazioni dei vincoli del database le solleva better-sqlite3 con un throw dentro il controller.

Nell'handler controllo di che tipo è l'errore e decido lo status: un errore di validazione diventa 400 con l'elenco dei campi non validi, la violazione del vincolo UNIQUE sul codice diventa 409, gli altri vincoli del database (quantità o priorità fuori dai valori ammessi) e il JSON malformato diventano 400, e qualsiasi cosa non prevista viene loggata e restituisce 500. Il vantaggio è che i controller non ripetono try/catch.

Nel frontend, tutte le chiamate HTTP passano da `api.js`: i componenti non usano mai fetch direttamente, chiamano funzioni come `getOrders` o `createOrder`. Lo stato vive in `App`, che lo passa ai componenti (form, filtri, tabella) tramite props.

Ho scelto SQLite perché è un database su file: chi clona la repo non deve installare o configurare niente, e per lo scope di questa prova mi sembrava la scelta più pratica.

Tra i punti facoltativi ho implementato la validazione lato backend.