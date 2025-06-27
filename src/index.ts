import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { suggestionRouter } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', suggestionRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
