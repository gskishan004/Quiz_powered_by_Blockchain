var Quiz = artifacts.require("./Quiz");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Quiz);
};