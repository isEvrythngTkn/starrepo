const StarNotary = artifacts.require('./StarNotary.sol');

module.exports = function(deployer, network, accounts) {
  return deployer.deploy(StarNotary);
};