require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT ?? 3000;
const productRouter = require("./routes/products.router");
const basketRouter = require('./routes/basket.router')
const config = require("./config/config");

config(app);
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname, "client", "build", "static")));
app.use(cors({ origin: "*", credentials: true }));

app.use("/", productRouter);
app.use('/basket', basketRouter)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => console.log(`***Server started at ${port} port ***`));
