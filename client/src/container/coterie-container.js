import React from 'react';

import CoterieContext from '../context/coterie-context';

import CoterieListContract from '../contracts/CoterieFactory.json';

/*const run = async () => {
    const web3 = new Web3('http://localhost:8545');
    console.log('accounts', await web3.eth.getAccounts());
	const networkId = await web3.eth.net.getId();
	const deployedNetwork = CoterieListContract.networks[networkId];
	const contract = new web3.eth.Contract(
		CoterieListContract.abi,
		deployedNetwork && deployedNetwork.address
	);
    console.log('coteries', await contract.methods.getCoteries().call());
}*/

class CoterieContainer extends React.Component {
	static getDerivedStateFromProps(props, state) {
		if (props.web3 && props.networkId && !state.contract) {
			const deployedNetwork = CoterieListContract.networks[props.networkId];
			const contract = new props.web3.eth.Contract(
				CoterieListContract.abi,
				deployedNetwork && deployedNetwork.address
			);
			return { contract };
		} else {
			return null;
		}
	}

	componentDidUpdate = (previousProps, previousState) => {
		if (this.state.contract && !this.state.coteries) {
			this.loadCoteries();
            this.estimateGas();
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			contract: null,
			coteries: null,
			currentCoterie: null,
            estimatedGas: {}
		};
	}

	setCurrentCoterie = coterie => this.setState({ currentCoterie: coterie });

	loadCoteries = async () => {
		const coterieAddresses = await this.state.contract.methods.getCoteries().call();
		this.setState({ coteries: coterieAddresses.map(coterieAddress => ({ id: coterieAddress })) });
		console.info(`${coterieAddresses.length} Coteries loaded`);
	};

    estimateGas = async () => {
        const createCoterieGasEstimation = await this.state.contract.methods.createCoterie('Test').estimateGas({ from: this.props.currentAccount, gas: 2000000 });
        console.info(`Create coterie gas cost: ${createCoterieGasEstimation}`);
        this.setState((prevState, props) => ({ estimatedGas: { ...prevState.estimatedGas, createCoterie: createCoterieGasEstimation } }));
    };

	createCoterie = async () => {
        const { name } = this.state.currentCoterie;

        try {
            const result = await this.state.contract.methods.createCoterie(name).send({ from: this.props.currentAccount, gas: Math.round(this.state.estimatedGas.createCoterie * 1.2) });
            console.info('Created coterie: ', result);
        } catch (error) {
            console.error(error);
        }
	};

    addCoterie = () => this.setCurrentCoterie({ id: 'NEW', name: '' });

	render = () => (
		<CoterieContext.Provider
			value={{
				coteries: this.state.coteries,
				currentCoterie: this.state.currentCoterie,
                estimatedGas: this.state.estimatedGas,
                setCurrentCoterie: this.setCurrentCoterie,
				createCoterie: this.createCoterie,
                addCoterie: this.addCoterie
			}}
		>
			{this.props.children}
		</CoterieContext.Provider>
	);
}

export default CoterieContainer;
