import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

//persers
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Level-2 Assignment server.');
});

export default app;
