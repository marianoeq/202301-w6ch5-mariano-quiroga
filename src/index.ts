import http from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);

server.on('listening', () => {
  console.log('listening on port ' + PORT);
});

server.listen(PORT);
