const express = require('express');
const jsonServer = require('json-server');
const jwt  = require('jsonwebtoken');

const server = express({ strict: true });

server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults());

server.use(function (req, res, next) {
  // converte ogni metodo in una GET
  req.url = '/' + req.method.toLowerCase() + req.url;
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
server.use('/get', jsonServer.router('db/root/get.json'));
server.use('/post', jsonServer.router('db/root/post.json'));

server.listen(3000);
