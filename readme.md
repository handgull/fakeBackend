# Istruzioni per l'uso
## Metodi di avvio
```sh
# metodo di avvio consigliato
npm start # questo metodo utilizza la dipendenza locale di nodemon
# NOTA: vedi sotto i commenti riguardandi all'avvio con nodemon

# altri metodi di avvio
node fakeBackend.js # avvio senza demone che aggiorna il server
nodemon fakeBackend.js # avvia e resta in ascolto di modifiche al file
# NOTA: nodemon va installato tramite npm sulla propria macchina:
npm install -g nodemon
```
## Caratteristiche del mio server
Il mio server node legge il metodo della richiesta e aggiunge il metodo al path della richiesta.
```sh
GET /hello # path originale
GET /get/hello # path modificato

POST /hello # path originale
POST /post/hello # path modificato
```
Questa scelta implementativa è stata fatta per poter mockare contemporaneamente anche endpoint con stesso path ma metodi differenti
## Come sfruttare json-server
Usando json-server posso prototipare in fretta le chiamate, ad esempio mettendo questo in `root.json`:
```json
{
  "hello": {
    "bye": "bye"
  }
}
```
se vado nel path `/hello` la GET mi restituisce l'oggetto seguente:
> NOTA: usando il mio script node che usa json-server come middleware ogni metodo diventa una GET e vengono ignorati body e query params.
```json
{
    "bye": "bye"
}
```
### Accedere a risorse con path composti:
> Per avere path composti come ad esempio `v1/path` aggiungere un file nella cartella `fakeDB` (per **coerenza** sarebbe consigliato chiamarlo v1.json).<br>
Popolare il file `v1.json` come visto nell'esempio sopra.<br>
Fatto questo basterà aggiungere la seguente riga prima del `server.use` con la root:
```js
server.use('/v1', jsonServer.router('db/v1.json'));
server.use('/', jsonServer.router('db/root.json'));
```
> in realtà, come visto sopra, non esiste quasi mai la possibilità di avere un server use con la root come path
## Creare un path con una parte di path variabile
Ad esempio per `path/delete/<id>` il json si scriverebbe così:
```json
{
  ":id": {
    "bye": "bye"
  }
}
```
Se invece il pezzo di path variabile non è nell'ultimo posto si deve lavorare sul `server.use`, nello stesso modo:
```js
server.use(':variabile/v1', jsonServer.router('db/v1.json'));
// 7/v1 -> ok
// 42/v1 -> ok
// ecc
```
