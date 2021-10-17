const Candidatures = artifacts.require("./Candidatures.sol");
const CandidaturesMock = artifacts.require("./CandidaturesMock.sol");
const Coterie = artifacts.require("./Coterie.sol");
const CoterieFactory = artifacts.require("./CoterieFactory.sol");

module.exports = function(deployer) {
    deployer.deploy(Candidatures);
    deployer.link(Candidatures, CandidaturesMock);

    deployer.deploy(CandidaturesMock);
    deployer.link(Candidatures, Coterie);

    deployer.link(Candidatures, CoterieFactory);
    deployer.deploy(CoterieFactory);
};
