const assertions = { ...assert, ...require('truffle-assertions') };

const Coterie = artifacts.require('Coterie');


const weiToEth = (wei) => web3.utils.fromWei(String(wei), 'ether');

const getEtherBalance = async (account) => {
    const balanceWei = await web3.eth.getBalance(account);
    return weiToEth(balanceWei, 'ether');
};


contract('A coterie created by user A', ([userA, userB, userC]) => {
    let coterieInstance;

    beforeEach(async () => {
        coterieInstance = await Coterie.new(
            'Test club',
            { from: userA }
        );
    });

    it('should have name "Test club"', async () => {
        assertions.equal(await coterieInstance.name(), 'Test club');
    });

    it('should have spent ether of user A', async () => {
        assertions.isBelow(Number(await getEtherBalance(userA)), 100);
    });

    it('should have a candidature with 0 votes', async () => {
        assertions.equal(
            await coterieInstance.numberOfMyVotes({ from: userA }),
            0
        );
    });

    it('should not allow second candidature for user A', async () => {
        await assertions.reverts(
            coterieInstance.createCandidature({ from: userA }),
            'CreateError: Candidature already exists'
        );
    });

    it('should have 1 member', async () => {
        const members = await coterieInstance.getMembers({ from: userA })
        assertions.equal(members.length, 1);
        assertions.equal(members[0], userA);
    });

    it('should not allow member access for user B', async () => {
        await assertions.reverts(
            coterieInstance.getMembers({ from: userB }),
            'PermissionError: Only members can access member list'
        );
    });

    it('should not have candidature for user B', async () => {
        await assertions.reverts(
            coterieInstance.numberOfMyVotes({ from: userB }),
            'NotFoundError: No candidature found for candidate'
        );
    });
});

contract('An other coterie', ([userA, userB, userC]) => {
    let coterieInstance;

    before(async () => {
        coterieInstance = await Coterie.new(
            'Test club 2',
            { from: userA }
        );
    });

    it('should have a candidature with 0 votes when user B creates a candidature', async () => {
        await coterieInstance.createCandidature({ from: userB });
        assertions.equal(
            await coterieInstance.numberOfMyVotes({ from: userB }),
            0
        );
    });
});

