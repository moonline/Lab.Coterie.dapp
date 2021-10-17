const assertions = { ...assert, ...require('truffle-assertions') };

const CoterieFactory = artifacts.require('CoterieFactory');
const Coterie = artifacts.require('Coterie');


contract('CoterieFactory with 2 coterie instances', ([userA, userB, userC, userD]) => {
    describe('A coterie created by user A', () => {
        let instance;

        beforeEach(async () => {
            instance = await CoterieFactory.deployed();
            await instance.createCoterie('Test club 1');
            await instance.createCoterie('Test club 2');
        });

        it('should 2 coteries', async () => {
            const contracts = await instance.getCoteries();

            assertions.equal(contracts.length, 2);
            assertions.equal(await (await Coterie.at(contracts[0])).name(), 'Test club 1');
            assertions.equal(await (await Coterie.at(contracts[1])).name(), 'Test club 2');
        });
    });
});
