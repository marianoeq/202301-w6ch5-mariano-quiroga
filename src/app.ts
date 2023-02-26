import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './router/things.router.js';
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use('/things', thingsRouter);

app.get('/', (req, res) => {
  res.json({});
});
app.get('/:id', (req, res) => {
  res.send('' + req.params.id);
});
app.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.patch('/');
app.patch('/:id');
app.delete('/:id');
