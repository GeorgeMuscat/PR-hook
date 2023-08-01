import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(json());
const port = process.env.PORT;
const host = process.env.HOST;
const webhook = process.env.WEBHOOK as string;
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/hook", (req: Request, res: Response) => {
  if (req.body.action === "opened" && req.body.pull_request !== undefined) {
    console.log(req.body); // Call your action on the request here
    // Forward to webhook
    fetch(webhook, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
