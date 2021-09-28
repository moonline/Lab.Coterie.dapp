const assertions = { ...assert, ...require('truffle-assertions') };

const Coterie = artifacts.require("Coterie");

const getEtherBalance = async (account) => {
    const balanceWei = await web3.eth.getBalance(account);
    return web3.utils.fromWei(balanceWei, 'ether');
};

contract("A new coterie created by user 1", ([user0, user1, user2]) => {
    let coterieInstance;

    beforeEach(async () => {
        coterieInstance = await Coterie.new(
            "Test club",
            { from: user1 }
        );
    });

    it("should have a candidature with 0 votes", async () => {
        assertions.equal(
            await coterieInstance.getCandidature.call({ from: user1 }),
            0        
        );
    });

    it("should have spent ether", async () => {
        assertions.isBelow(Number(await getEtherBalance(user1)), 100);
    });

    it("should not have candidature for user 2", async () => {
        await assertions.reverts(
            coterieInstance.getCandidature.call({ from: user2 }),
            'NotFoundError: Candidature does not exist'
        );
    });

    it("should not allow second candidature for user 1", async () => {
        await assertions.reverts(
            coterieInstance.createCandidature.call({ from: user1 }),
            'CreateError: Candidature does already exist'
        );
    });
});

