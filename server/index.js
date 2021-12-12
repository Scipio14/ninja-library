import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();
const app = express();

//allow cors
app.use(cors());

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use("/", (req, res) => {
  res.send("<h1>Running GraphQL Ninja Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server runinin on port ${PORT}`);
});
