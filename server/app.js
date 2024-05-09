import express from "express";
import router from "./routers/index.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

router(app);
