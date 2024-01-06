import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Still Working On API");
});
app.use("/", authRoutes);
app.use("/", userRoutes);

const PORT = 5000;

const DATABASE_URL =
  "mongodb+srv://kashyapsaurabh0908:kashyapsaurabh@cluster0.gitxnrv.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
