const Candidatures = artifacts.require("./Candidatures.sol");
const CandidaturesMock = artifacts.require("./CandidaturesMock.sol");
const Coterie = artifacts.require("./Coterie.sol");
const CoterieList = artifacts.require("./CoterieList.sol");

module.exports = function (deployer) {
	deployer.deploy(Candidatures);
	deployer.link(Candidatures, CandidaturesMock);

	deployer.deploy(CandidaturesMock);
	deployer.link(Candidatures, Coterie);

	deployer.link(Candidatures, CoterieList);
	deployer.deploy(CoterieList);
};
