const assertions = { ...assert, ...require('truffle-assertions') };

const CoterieList = artifacts.require('CoterieList');
const Coterie = artifacts.require('Coterie');


contract('CoterieList with 2 coterie instances', ([userA, userB, userC, userD]) => {
    describe('Coteries created by user A and B', () => {
        let instance;

        beforeEach(async () => {
            instance = await CoterieList.deployed();
            await instance.createCoterie('Test club 1', { from: userA });
            await instance.createCoterie('Test club 2', { from: userB });
        });

        it('should have 2 coteries', async () => {
            const contracts = await instance.getCoteries();

            assertions.equal(contracts.length, 2);

            const testClub1 = await Coterie.at(contracts[0]);
            const testClub2 = await Coterie.at(contracts[1]);

            assertions.equal(await testClub1.name(), 'Test club 1');
            assertions.equal(await testClub2.name(), 'Test club 2');
            
            const members1 = await testClub1.getMembers({ from: userA });
            assertions.equal(members1.length, 1);
            assertions.equal(members1[0], userA);

            const members2 = await testClub2.getMembers({ from: userB });
            assertions.equal(members2.length, 1);
            assertions.equal(members2[0], userB);
        });
    });

    // TODO test event
});
