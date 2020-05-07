const nodeFetch = require('node-fetch');

const fetch = async url => {
  const data = await nodeFetch(url);
  const json = await data.json();
  return json;
};

const network = {
  fetch
};

module.exports = network;
