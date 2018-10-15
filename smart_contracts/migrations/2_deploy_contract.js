const StarNotary = artifacts.require('./StarNotary.sol');

module.exports = function(deployer, network, accounts) {
  return deployer.deploy(StarNotary);
};

// deployed to: 0x47239e7f1a12f9d6385bd9cb93d4522e423f971e