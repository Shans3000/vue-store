import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://tigran-backend.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("✅ Backend работает!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));

