const assertions = { ...assert, ...require('truffle-assertions') };

const Coterie = artifacts.require('Coterie');


const weiToEth = (wei) => web3.utils.fromWei(String(wei), 'ether');

const getEtherBalance = async (account) => {
    const balanceWei = await web3.eth.getBalance(account);
    return weiToEth(balanceWei, 'ether');
};

contract('Coterie', ([userA, userB, userC]) => {
    describe('A coterie created by user A', () => {
        let instance;

        beforeEach(async () => {
            instance = await Coterie.new(
                'Test club',
                { from: userA }
            );
        });

        it('should have name "Test club"', async () => {
            assertions.equal(await instance.name(), 'Test club');
        });

        it('should have spent ether of user A', async () => {
            assertions.isBelow(Number(await getEtherBalance(userA)), 100);
        });

        it('should have a candidature with 0 votes', async () => {
            assertions.equal(
                await instance.numberOfMyVotes({ from: userA }),
                0
            );
        });

        it('should not allow second candidature for user A', async () => {
            await assertions.reverts(
                instance.createCandidature({ from: userA }),
                'CreateError: Candidature already exists'
            );
        });

        it('should have 1 member', async () => {
            const members = await instance.getMembers({ from: userA })
            assertions.equal(members.length, 1);
            assertions.equal(members[0], userA);
        });

        it('should not allow member access for user B', async () => {
            await assertions.reverts(
                instance.getMembers({ from: userB }),
                'PermissionError: Only members can access member list'
            );
        });

        it('should not have candidature for user B', async () => {
            await assertions.reverts(
                instance.numberOfMyVotes({ from: userB }),
                'NotFoundError: No candidature found for candidate'
            );
        });
    });

    describe('An other coterie', () => {
        let instance;

        before(async () => {
            instance = await Coterie.new(
                'Test club 2',
                { from: userA }
            );
        });

        it('should have candidatures with 0 votes for users A and B when user B creates a candidature', async () => {
            let expectedValues = [[ userA, "0" ],[ userB, "0" ]];
            await instance.createCandidature({ from: userB });

            assertions.deepEqual(
                await instance.getCandidatures(),
                expectedValues
            );
        });
    });
});

