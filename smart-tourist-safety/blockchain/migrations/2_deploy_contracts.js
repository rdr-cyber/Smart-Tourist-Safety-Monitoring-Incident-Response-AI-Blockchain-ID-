const TouristIdentity = artifacts.require("TouristIdentity");

module.exports = function (deployer) {
  deployer.deploy(TouristIdentity);
};