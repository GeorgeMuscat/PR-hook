import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host = process.env.HOST;
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.post('/hook', (req: Request, res: Response) => {
    console.log(req.body); // Call your action on the request here
    res.status(200).end();
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
