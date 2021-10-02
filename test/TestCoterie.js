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

    it("should have name 'Test club'", async () => {
        assertions.equal(await coterieInstance.name(), 'Test club');
    });

    it("should have spent ether of user 1", async () => {
        assertions.isBelow(Number(await getEtherBalance(user1)), 100);
    });

    it("should have a candidature with 0 votes", async () => {
        assertions.equal(
            await coterieInstance.getCandidature({ from: user1 }),
            0
        );
    });

    it("should not allow second candidature for user 1", async () => {
        await assertions.reverts(
            coterieInstance.createCandidature({ from: user1 }),
            'CreateError: Candidature does already exist'
        );
    });

    it("should have 1 member", async () => {
        const members = await coterieInstance.getMembers({ from: user1 })
        assertions.equal(members.length, 1);
        assertions.equal(members[0], user1);
    });

    it("should not allow member access for user 2", async () => {
        await assertions.reverts(
            coterieInstance.getMembers({ from: user2 }),
            'PermissionError: Only members can access member list'
        );
    });

    it("should not have candidature for user 2", async () => {
        await assertions.reverts(
            coterieInstance.getCandidature({ from: user2 }),
            'NotFoundError: Candidature does not exist'
        );
    });
});

contract("User 2 creates a candidature", ([user0, user1, user2]) => {
    let coterieInstance;

    beforeEach(async () => {
        coterieInstance = await Coterie.new(
            "Test club 2",
            { from: user1 }
        );
        await coterieInstance.createCandidature({ from: user2 });
    });

    it("should have a candidature with 0 votes", async () => {
        assertions.equal(
            await coterieInstance.getCandidature({ from: user2 }),
            0
        );
    });
});

