import express from "express";
import cors from "cors";
import uitchat from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/v1/uitchat", uitchat);
// app.use("*", (req, res) => {
//   res.status(404).json({ error: "not found" });
// });

export default app;
