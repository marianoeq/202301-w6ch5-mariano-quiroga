import { Router } from 'express';

export const thingsRouter = Router();

thingsRouter.get('/');
thingsRouter.get('/:id');
thingsRouter.post('/');
thingsRouter.patch('/:id');
thingsRouter.delete('/:id');
