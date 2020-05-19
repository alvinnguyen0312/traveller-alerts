const dbRtns = require("./dbroutines");
const { alerts, travellers } = require("./config");
const alertSetUp = require("./setupalerts");

const resolvers = {
  setupalerts: async () => {
    let db = await dbRtns.loadDB();
    let result = await alertSetUp.SetupAlertFunction();
    //console.log(result);
    return result;
  },
  alerts: async () => {
    let db = await dbRtns.loadDB();
    let result = await dbRtns.findAll(db, alerts, {}, {});
    return result;
  },
  alertbyregion: async args => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, alerts, { region: args.region }, {});
  },
  alertbysubregion: async args => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, alerts, { subregion: args.subregion }, {});
  },
  regions: async () => {
    let db = await dbRtns.loadDB();
    let result = await dbRtns.findDistinct(db, alerts, "region");
    console.log(result);
    return result;
  },
  subregions: async () => {
    let db = await dbRtns.loadDB();
    let result = await dbRtns.findDistinct(db, alerts, "subregion");
    return result;
  },
  countries: async () => {
    let db = await dbRtns.loadDB();
    let result = await dbRtns.findDistinct(db, alerts, "name");
    return result;
  },
  travellers: async () => {
    let db = await dbRtns.loadDB();
    let result = await dbRtns.findAll(db, travellers, {}, {});
    return result;
  },
  posttraveller: async args => {
    let db = await dbRtns.loadDB();

    let traveller = {
      name: args.name,
      country: args.country,
      timestamp: args.timestamp
    };
    let results = await dbRtns.addOne(db, travellers, traveller);
    return results.insertedCount === 1 ? traveller : null;
  }
};
module.exports = { resolvers };
