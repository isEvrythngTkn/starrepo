const HDWalletProvider = require("truffle-hdwallet-provider");

const { mnemonic, infuraURL } = require('./secrets.js');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, infuraURL)
      },
      network_id: 4
    }
  }
};
