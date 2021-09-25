const Coterie = artifacts.require("Coterie");

contract("Coterie", accounts => {
    it("should have a candidatures with 0 votes", async () => {
        let user = accounts[1];
        let coterieInstance = await Coterie.new(
            "Test club",
            { from: user }
        );
        assert.equal(
            await coterieInstance.getCandidature.call({ from: user }),
            0        
        );
    });
});
