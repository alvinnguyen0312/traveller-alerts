const { alerturl, isocountries, alerts } = require("./config");
const rtns = require("./utilities");
const dbrtns = require("./dbroutines");

const SetupAlertFunction = async () => {
  let resultMsg = "";
  try {
    //load DB
    db = await dbrtns.loadDB();

    //Delete any existing documents from an alerts collection
    let results = await dbrtns.deleteAll(db, alerts);
    resultMsg += `Deleted ${results.deletedCount} existing documents from alerts collection. `;

    //obtain country ISO JSON
    let countryJson = await rtns.getJSONFromWWWPromise(isocountries);
    resultMsg += `Retrieved Country JSON from remote website. `;

    //Obtain the alert JSON
    let alertJson = await rtns.getJSONFromWWWPromise(alerturl);
    resultMsg += `Retrieved Alert JSON from remote website. `;

    let count = 0;
    //Handle country with alert
    await Promise.allSettled(
      countryJson
        .map(country =>
          Object.values(alertJson.data).find(alert => {
            if (alert["country-iso"] === country["alpha-2"]) {
              alert["region"] = country.region;
              alert["subregion"] = country["sub-region"];
              country["no-alert"] = "false"; // set a new property in country with alert
              return true;
            }
          })
        )
        .map(async alert => {
          let results = await dbrtns.addOne(db, alerts, {
            country: alert["country-iso"],
            name: alert["country-eng"],
            text: alert.eng["advisory-text"],
            date: alert["date-published"].date,
            region: alert.region,
            subregion: alert.subregion
          });
          count += results.insertedCount;
        })
    );
    //Handle country without alert
    await Promise.allSettled(
      countryJson.map(async country => {
        if (!country["no-alert"]) {
          let results = await dbrtns.addOne(db, alerts, {
            country: country["alpha-2"],
            name: country.name,
            text: "No travel alerts",
            date: "",
            region: country.region,
            subregion: country["sub-region"]
          });
          count += results.insertedCount;
        }
      })
    );
    resultMsg += `Added approximately ${count} new documents to the alerts collection. `;
  } catch (error) {
    console.log(error);
  } finally {
    return resultMsg;
    process.exit();
  }
};
SetupAlertFunction();

module.exports = {
  SetupAlertFunction
};
