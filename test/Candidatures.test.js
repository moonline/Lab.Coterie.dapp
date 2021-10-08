const assertions = { ...assert, ...require('truffle-assertions') };

const CandidaturesMock = artifacts.require('CandidaturesMock');


contract('Candidatures library', ([userA, userB, userC]) => {
    describe('instance', async () => {
        it('should have 0 candidatures', async () => {
            let instance = await CandidaturesMock.new();
            assertions.equal(await instance.length(), 0);
        });
    });
    
    describe('add users A and B', async () => {
        let instance;

        beforeEach(async () => {
            instance = await CandidaturesMock.new();
            await instance.add(userA);
            await instance.add(userB);
        });

        it('should have 2 candidatures', async () => {
            assertions.equal(await instance.length(), 2);
        });

        it('should have candidature for users A and B', async () => {
            assertions.isTrue(await instance.contains(userA));
            assertions.isTrue(await instance.contains(userB));
        });

        it('should not have candidature for user C', async () => {
            assertions.isFalse(await instance.contains(userC));
        });

        it('should have 0 votes for users A and B ', async () => {
            let expectedValues = [[ userA, "0" ], [ userB, "0" ]];
            assertions.deepEqual(await instance.values(), expectedValues);
        });

        it('should not allow second candidature for user A', async () => {
            await assertions.reverts(
                instance.add(userA),
                'CreateError: Candidature already exists'
            );
        });
    });
});

