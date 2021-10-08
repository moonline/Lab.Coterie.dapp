const assertions = { ...assert };

const Coterie = artifacts.require('Coterie');


const ETH_TO_USD = 3400;

const weiToEthAndUSD = (wei) => {
    const eth = web3.utils.fromWei(String(wei), 'ether');
    return [eth, eth*ETH_TO_USD];
};


contract('A coterie', ([user0, user1, user2]) => {
    let coterieInstance;

    before(async () => {
        coterieInstance = await Coterie.new(
            'Test club 2',
            { from: user1 }
        );
    });

    it('spent eth for creation', async () => {
        const instanceReceipt = await web3.eth.getTransactionReceipt(coterieInstance.transactionHash);
        console.log('New coterie price (ETH/USD):', weiToEthAndUSD(instanceReceipt.gasUsed));
    });

    it('spent eth to create a andidature ', async () => {        
        const { receipt: candidatureReceipt } = await coterieInstance.createCandidature({ from: user2 });
        console.log('Create candidature price (ETH/USD):', weiToEthAndUSD(candidatureReceipt.gasUsed));
    });
});
