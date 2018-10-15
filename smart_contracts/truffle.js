const HDWalletProvider = require("truffle-hdwallet-provider");

const { mnemonic, infuraURL } = require('./secrets.js');

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, infuraURL)
      },
      network_id: 4
    }   
  }
};
