const http = require('http');
const { URL } = require('url');

const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(parsedUrl)

  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  // verificando se rota selecionado pelo usuário existe como endpoint
  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));

  if (route) { // exibindo rota existente
    // convertendo Iterable para Objeto
    request.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(request, response);
  } else { // exibindo mensagem 404 de rota não encontrada
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }

});
// definindo porta do servidor
server.listen(3000, () => console.log('Server started at http://localhost:3000'));