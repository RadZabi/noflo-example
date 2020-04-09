const noflo = require('noflo');

function getFlowhubStats() {
  return fetch('https://api.flowhub.io/stats')
    .then(result => result.json());
}

exports.getComponent = () => noflo.asComponent(getFlowhubStats);
