import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import surveys from "../surveys.json";
import { Answer, Question } from "./types";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Animal Survey API is Running!");
});

app.get("/api/get-surveys", (req: Request, res: Response) => {
  res.json({ surveys: surveys.surveys as Question[] });
});

interface SaveAnswersRequest {
  answers: Answer[];
}

app.post(
  "/api/save-answers",
  (req: Request<{}, {}, SaveAnswersRequest>, res: Response) => {
    res.json({ success: true });
  }
);

app.post("/api/reset-answers", (req: Request, res: Response) => {
  res.json({ success: true });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

interface ErrorHandlerError {
  status?: number;
  message?: string;
}

app.use(
  (err: ErrorHandlerError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
