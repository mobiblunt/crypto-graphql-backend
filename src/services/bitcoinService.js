const https = require('https');

function getBitcoinPrice() {
  return new Promise((resolve, reject) => {
    https.get('https://api.coindesk.com/v1/bpi/currentprice.json', (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parseFloat(parsedData.bpi.USD.rate.replace(',', '')));
        } catch (error) {
          reject(error);
        }
      });

    }).on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = { getBitcoinPrice };