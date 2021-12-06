import React from 'react';

import CoterieContext from '../context/coterie-context';

import CoterieListContract from '../contracts/CoterieList.json';
import CoterieContract from '../contracts/Coterie.json';

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
			this.estimateCoterieCreationGas();
		}
		if (this.props.currentAccount !== previousProps.currentAccount && this.state.currentCoterie) {
			this.loadCoterie(this.state.currentCoterie);
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

	setCurrentCoterie = coterie => {
		this.setState({ currentCoterie: coterie });
		this.loadCoterie(coterie);
	};

	loadCoteries = async () => {
		const coterieAddresses = await this.state.contract.methods
			.getCoteries()
			.call({ from: this.props.currentAccount });
		this.setState({ coteries: coterieAddresses.map(coterieAddress => ({ id: coterieAddress })) });
		console.info(`${coterieAddresses.length} Coteries loaded`);
	};

	setVoteCandidateGasEstimation = async (contract, candidatures) => {
		const gasEstimations = await Promise.all(
			candidatures
				.map(candidature => candidature.candidate)
				.filter(candidate => candidate !== this.props.currentAccount)
				.map(async candidate => {
					const gasEstimation = await contract.methods
						.vote(candidate)
						.estimateGas({ from: this.props.currentAccount, gas: 2000000 });
					return [candidate, gasEstimation];
				})
		);

		this.setState((prevState, props) => ({
			estimatedGas: {
				...prevState.estimatedGas,
				voteCandidate: gasEstimations.reduce(
					(estimations, [candidate, estimation]) => ({ ...estimations, [candidate]: estimation }),
					{}
				)
			}
		}));
	};

	loadCoterieMembersAndCandidatures = async (contract, coterie) => {
		if (coterie.hasCandidature) {
			const myCandidatureVotationResult = await contract.methods
				.getVotationResult(this.props.currentAccount)
				.call({ from: this.props.currentAccount });

			this.setState((prevState, props) => ({
				currentCoterie: {
					...prevState.currentCoterie,
					myCandidatureVotationResult
				}
			}));
		} else {
			const createCandidatureGasEstimation = await contract.methods
				.createCandidature()
				.estimateGas({ from: this.props.currentAccount, gas: 2000000 });

			this.setState((prevState, props) => ({
				estimatedGas: {
					...prevState.estimatedGas,
					createCandidature: createCandidatureGasEstimation
				}
			}));
		}

		if (coterie.isMember) {
			const members = await contract.methods.getMembers().call({ from: this.props.currentAccount });
			const candidatures = await contract.methods
				.getCandidatures()
				.call({ from: this.props.currentAccount });

			this.setVoteCandidateGasEstimation(contract, candidatures);

			this.setState((prevState, props) => ({
				currentCoterie: {
					...prevState.currentCoterie,
					members,
					candidatures
				}
			}));
		}
	};

	loadCoterie = async coterie => {
		if (coterie.id !== 'NEW') {
			const contract = new this.props.web3.eth.Contract(CoterieContract.abi, coterie.id);
			const currentCoterie = await contract.methods
				.getDetails()
				.call({ from: this.props.currentAccount });
			const {
				coterieName: name,
				numberOfMembers,
				isMember,
				numberOfCandidatures,
				hasCandidature
			} = currentCoterie;

			const updatedCurrentCoterie = {
				...coterie,
				contract,
				name,
				numberOfMembers,
				isMember,
				numberOfCandidatures,
				hasCandidature
			};

			this.setState({
				currentCoterie: updatedCurrentCoterie
			});
			this.loadCoterieMembersAndCandidatures(contract, updatedCurrentCoterie);
		}
	};

	estimateCoterieCreationGas = async () => {
		const createCoterieGasEstimation = await this.state.contract.methods
			.createCoterie('Test')
			.estimateGas({ from: this.props.currentAccount, gas: 2000000 });
		this.setState((prevState, props) => ({
			estimatedGas: { ...prevState.estimatedGas, createCoterie: createCoterieGasEstimation }
		}));
	};

	createCoterie = async () => {
		const { name } = this.state.currentCoterie;

		try {
			const result = await this.state.contract.methods.createCoterie(name).send({
				from: this.props.currentAccount,
				gas: Math.round(this.state.estimatedGas.createCoterie * 1.2)
			});
			console.info('Created coterie: ', result.events.contractCreated);
			const newCoterie = { id: result.events.contractCreated.returnValues.coterieAddress };
			this.setCurrentCoterie(newCoterie);
			this.setState((prevState, props) => ({ coteries: [...prevState.coteries, newCoterie] }));
		} catch (error) {
			console.error(error);
		}
	};

	addCoterie = () => this.setCurrentCoterie({ id: 'NEW', name: '' });

	createCandidature = async () => {
		try {
			const result = await this.state.currentCoterie.contract.methods.createCandidature().send({
				from: this.props.currentAccount,
				gas: Math.round(this.state.estimatedGas.createCandidature * 1.2)
			});
			console.info('Created candidature: ', result);
			this.loadCoterie(this.state.currentCoterie);
		} catch (error) {
			console.error(error);
		}
	};

	voteCandidate = async candidate => {
		try {
			const result = await this.state.currentCoterie.contract.methods.vote(candidate).send({
				from: this.props.currentAccount,
				gas: Math.round(this.state.estimatedGas.voteCandidate[candidate] * 1.2)
			});
			console.info('Voted candidate: ', result);
			this.loadCoterie(this.state.currentCoterie);
		} catch (error) {
			console.error(error);
		}
	};

	render = () => (
		<CoterieContext.Provider
			value={{
				coteries: this.state.coteries,
				estimatedGas: this.state.estimatedGas,
				currentCoterie: this.state.currentCoterie,

				setCurrentCoterie: this.setCurrentCoterie,
				createCoterie: this.createCoterie,
				addCoterie: this.addCoterie,
				createCandidature: this.createCandidature,
				voteCandidate: this.voteCandidate
			}}
		>
			{this.props.children}
		</CoterieContext.Provider>
	);
}

export default CoterieContainer;
