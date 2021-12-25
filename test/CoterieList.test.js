const assertions = { ...assert, ...require('truffle-assertions') };

const CoterieList = artifacts.require('CoterieList');
const Coterie = artifacts.require('Coterie');


contract('CoterieList with 2 coterie instances', ([userA, userB, userC, userD]) => {
    describe('Coteries created by user A and B', () => {
        let instance;
        let coterie1;
        let coterie2;
        let contracts;

        before(async () => {
            instance = await CoterieList.deployed();
            coterie1 = await instance.createCoterie('Test club 1', { from: userA });
            coterie2 = await instance.createCoterie('Test club 2', { from: userB });
            contracts = await instance.getCoteries();
        });

        it('should have 2 coteries', async () => {
            assertions.equal(contracts.length, 2);
        });

        it('should have testClub1 coterie', async () => {
            const testClub1 = await Coterie.at(contracts[0]);

            assertions.equal(await testClub1.name(), 'Test club 1');

            const members1 = await testClub1.getMembers({ from: userA });
            assertions.equal(members1.length, 1);
            assertions.equal(members1[0], userA);
        });

        it('should have testClub2 coterie', async () => {
            const testClub2 = await Coterie.at(contracts[1]);

            assertions.equal(await testClub2.name(), 'Test club 2');

            const members2 = await testClub2.getMembers({ from: userB });
            assertions.equal(members2.length, 1);
            assertions.equal(members2[0], userB);
        });

        it('should have emited 2 contractCreated events', async () => {
            assertions.eventEmitted(coterie1, 'contractCreated', { coterieAddress: contracts[0] });
            assertions.eventEmitted(coterie2, 'contractCreated', { coterieAddress: contracts[1] });
        });
    });
});
