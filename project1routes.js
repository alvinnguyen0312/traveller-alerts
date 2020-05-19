const { coll } = require("./config");
const express = require("express");
const router = express.Router();
const dbRtns = require("./dbroutines");
const alertSetUp = require("./setupalerts");
// define a default route to retrieve all users
router.get("/", async (req, res) => {
  try {
    //let db = await dbRtns.loadDB();
    let result = await alertSetUp.SetupAlertFunction();
    res.status(200).send({ result: result });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

module.exports = router;
