const fetch = require('isomorphic-fetch');
const config = require('../config');

class OWService {
  getUserBlob(battletag) {
    const delimiters = battletag.match(/#|-/g);
    const delimiter = Array.isArray(delimiters) && delimiters.length === 1 ? delimiters[0] : [];
    let formattedBattleTag;

    if (delimiter !== '#' && delimiter !== '-') {
      return Promise.reject({ error: '400', message: 'Invalid Battletag was supplied' });
    }
    if (delimiters[0] === '#') formattedBattleTag = battletag.replace(/\b(#)\b/, '-');

    return fetch(`https://${config.owHost}/${config.owBasePath}/${formattedBattleTag}/blob`);
  }
}

module.exports = OWService;
