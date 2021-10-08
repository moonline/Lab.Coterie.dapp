//const Coterie = artifacts.require("./Coterie.sol");
const Candidatures = artifacts.require("./Candidatures.sol");
const CandidaturesMock = artifacts.require("./CandidaturesMock.sol");

module.exports = function(deployer) {
    deployer.deploy(Candidatures);
    deployer.link(Candidatures, CandidaturesMock);
    deployer.deploy(CandidaturesMock);
};
