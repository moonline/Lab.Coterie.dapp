const assertions = { ...assert, ...require('truffle-assertions') };

const CandidaturesMock = artifacts.require('CandidaturesMock');


contract('Candidatures library', ([userA, userB, userC]) => {
    describe('instance', async () => {
        it('should have 0 candidatures', async () => {
            let instance = await CandidaturesMock.new();
            assertions.equal(await instance.numberOfCandidatures(), 0);
        });
    });
    
    describe('add users A and B', async () => {
        let instance;

        beforeEach(async () => {
            instance = await CandidaturesMock.new();
            await instance.addCandidature(userA);
            await instance.addCandidature(userB);
        });

        it('should have 2 candidatures', async () => {
            assertions.equal(await instance.numberOfCandidatures(), 2);
        });

        it('should have candidature for users A and B', async () => {
            assertions.isTrue(await instance.hasCandidature(userA));
            assertions.isTrue(await instance.hasCandidature(userB));
        });

        it('should not have candidature for user C', async () => {
            assertions.isFalse(await instance.hasCandidature(userC));
        });

        it('should have 0 votes for users A and B ', async () => {
            let expectedValues = [[ userA, "0" ], [ userB, "0" ]];
            assertions.deepEqual(await instance.getCandidatures(), expectedValues);
        });

        it('should not allow second candidature for user A', async () => {
            await assertions.reverts(
                instance.addCandidature(userA),
                'CreateError: Candidature already exists'
            );
        });
    });

    describe('users B and C vote for user A', async () => {
        let instance;

        beforeEach(async () => {
            instance = await CandidaturesMock.new();
            await instance.addCandidature(userA);
            await instance.addCandidature(userB);
            await instance.addVote(userA, userB);
            await instance.addVote(userA, userC);
        });

        it('should have 2 votes for user A ', async () => {
            assertions.equal(await instance.numberOfVotes(userA), 2);
        });

        it('should only have votes for user A', async () => {
            let expectedValues = [[ userA, "2" ], [ userB, "0" ]];
            assertions.deepEqual(await instance.getCandidatures(), expectedValues);
        });

        it('should not allow voting itself', async () => {
            await assertions.reverts(                
                instance.addVote(userA, userA),
                'PermissionError: A candidate can not vote for himself'
            );
        });

        it('should not increment votes for second vote of user B', async () => {
            await instance.addVote(userA, userB);
            assertions.equal(await instance.numberOfVotes(userA), 2);
        });

        it('should fail voting a not existing candidature', async () => {
            await assertions.reverts(
                instance.addVote(userC, userA),
                'NotFoundError: No candidature found for candidate'
            );
        });
    });
});

