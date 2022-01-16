import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import providerRoutes from "./routes/provider.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to Tiffin Search Backend");
});
app.use("/provider", providerRoutes);
app.use("/user", userRouter);

const CONNECTION_URL =  "mongodb+srv://pmodi:admin@tiffinsearchbackend.3zqtc.mongodb.net/tiffinsearch?retryWrites=true&w=majority";
const PORT = 3000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
