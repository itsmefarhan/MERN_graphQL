const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

mongoose.connect("mongodb://localhost:27017/mern_graphql", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => console.log("db connected"));

// Init graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => console.log("Server is running on port 5000"));
