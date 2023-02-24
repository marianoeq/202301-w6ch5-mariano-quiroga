import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('soy un middleware');
  next();
});

// app.use('/things', thingsRouter);

app.get('/', (req, res) => {
  res.json({ name: 'pepe' });
});
app.get('/:id', (req, res) => {
  res.send('Hola Mundo' + req.params.id);
});
app.post('/', (req, res) => {
  req.body.id = 12;
  console.log(req.body);
  res.send(req.body);
});
app.patch('/');
app.patch('/:id');
app.delete('/:id');
