const { port, graphql, server } = require("./config");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
//const projectroutes = require("./project1routes");
const bodyParser = require("body-parser");
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const cors = require("cors");

//app.use(cors());
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use("/setupalerts", projectroutes);
app.use(express.static("public"));

app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphql: true
  })
);

app.listen(port, () => {
  console.log(
    `Server ready at ${server}:${port}${graphql} - ${process.env.NODE_ENV}`
  );
});
