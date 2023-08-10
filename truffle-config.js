const path = require('path');

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	compilers: {
		solc: {
			version: '0.8.21'
		}
	},
	contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
	networks: {
		/* truffle test network (slower)
    develop: {
      port: 8545
    },
    */
		// ganache test network
		development: {
			host: '127.0.0.1',
			port: 8545,
			network_id: '*'
		}
	},
	mocha: {
		enableTimeouts: false
	}
};
