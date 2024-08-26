import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:5173']}));

// application routes
app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
  res.send('Hellow World')
});

app.use(globalErrorHandler);
// api not found
app.use(notFound);

export default app;
