const request = require("request");

const getJSONFromWWWPromise = url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(`Unable to retrieve data from the link ${url}`);
        return;
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

module.exports = {
  getJSONFromWWWPromise
};
