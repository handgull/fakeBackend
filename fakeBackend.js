const express = require('express');
const jsonServer = require('json-server');
const jwt  = require('jsonwebtoken');

const server = express({ strict: true });

server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults());

server.use(function (req, res, next) {
  // converte ogni metodo in una GET
  req.method = 'GET';
  // req.query = req.body // mette il payload nei query params
  next();
});

/* CUSTOM PATHS CHE NECESSITANO DI QUALCHE LOGICA AGGIUNTIVA (AD ESEMPIO JWT)

server.get('/authentication', function (req, res) {
  const payload = {
    history: true
  };
  const signOptions = {
    expiresIn: '1h'
  };
  const token = jwt.sign(payload, 'privateKEY', signOptions);
  res.json({ token: token });
});
*/
server.use('/', jsonServer.router('db/root.json'));

server.listen(3000);
