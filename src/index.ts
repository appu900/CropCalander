import express, { Request, Response } from "express";
const app = express();

app.get("/pingme", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("server is live");
});
