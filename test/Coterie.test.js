const assertions = { ...assert, ...require('truffle-assertions') };

const Coterie = artifacts.require('Coterie');


const weiToEth = (wei) => web3.utils.fromWei(String(wei), 'ether');

const getEtherBalance = async (account) => {
    const balanceWei = await web3.eth.getBalance(account);
    return weiToEth(balanceWei, 'ether');
};

contract('Coterie', ([userA, userB, userC, userD]) => {
    describe('A coterie created by user A', () => {
        let instance;

        beforeEach(async () => {
            instance = await Coterie.new(
                'Test club',
                userA,
                { from: userB }
            );
        });

        it('should have name "Test club"', async () => {
            assertions.equal(await instance.name(), 'Test club');
        });

        it('should have spent ether of user B', async () => {
            assertions.isBelow(Number(await getEtherBalance(userA)), 100);
        });

        it('should have a candidature with 0 votes for A', async () => {
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

        it('should have candidatures with 0 votes for users A and B when user B creates a candidature', async () => {
            let expectedValues = [[ userA, "0" ],[ userB, "0" ]];
            await instance.createCandidature({ from: userB });

            assertions.deepEqual(
                await instance.getCandidatures(),
                expectedValues
            );
        });
    });

    describe('A coterie with a vote for user B', () => {
        let instance;
        
        beforeEach(async () => {
            instance = await Coterie.new(
                'Test club 2',
                userA,
                { from: userA }
            );
            await instance.createCandidature({ from: userB });
            await instance.vote(userB, { from: userA });
        });

        it('should have 1 vote for user B', async () => {
            assertions.equal(await instance.numberOfMyVotes({ from: userB }), 1);
            assertions.equal(await instance.numberOfVotes(userB, { from: userA }), 1);
        });

        it('should not allow not-member C to vote', async () => {
            await assertions.reverts(
                instance.vote(userB, { from: userC }),
                'PermissionError: Only members can vote candidatures'
            );
        });

        it('should have 100% of the votes for user B', async () => {
            assertions.equal((await instance.getVotationResult(userB)).toNumber(), 100);
        });

        it('should raise user B to member', async () => {
            assertions.deepEqual(await instance.getMembers({ from: userA }), [userA, userB]);
        });

        it('should have 50% of the votes for a new candidature with only 1 vote', async () => {
            await instance.createCandidature({ from: userC });
            await instance.vote(userC, { from: userA });

            assertions.equal((await instance.getVotationResult(userC)).toNumber(), 50);
            assertions.deepEqual(await instance.getMembers({ from: userA }), [userA, userB]);
        });
    });

    describe('A coterie with 3 members', () => {
        let instance;
        
        beforeEach(async () => {
            instance = await Coterie.new(
                'Test club 2',
                userA,
                { from: userA }
            );
            await instance.createCandidature({ from: userB });
            await instance.vote(userB, { from: userA });

            await instance.createCandidature({ from: userC });
            await instance.vote(userC, { from: userA });
            await instance.vote(userC, { from: userB });

            await instance.createCandidature({ from: userD });
            await instance.vote(userD, { from: userB });
        });

        it('should have 100% of votes and raise C to member when B votes', async () => {
            assertions.equal((await instance.getVotationResult(userC)).toNumber(), 100);
            assertions.deepEqual(await instance.getMembers({ from: userA }), [userA, userB, userC]);
        });

        it('should have 33% of the votes for D when B votes', async () => {
            assertions.equal((await instance.getVotationResult(userD)).toNumber(), 33);
            assertions.deepEqual(await instance.getMembers({ from: userA }), [userA, userB, userC]);
        });

        it('should have 75% of the votes D when A votes', async () => {
            await instance.vote(userD, { from: userA });

            assertions.equal((await instance.getVotationResult(userD)).toNumber(), 75);
        });
    });
});

