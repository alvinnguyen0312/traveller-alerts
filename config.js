const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  alerturl: process.env.ALERTURL,
  isocountries: process.env.ISOCOUNTRIES,
  alerts: process.env.ALERTCOLLECTION,
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
  travellers: process.env.TRAVELLERCOLLECTION,
  server: process.env.SERVER
};
