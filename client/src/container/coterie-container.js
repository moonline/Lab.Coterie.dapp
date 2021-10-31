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
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			contract: null,
			coteries: null,
			currentCoterie: null
		};
	}

	setCurrentCoterie = coterie => this.setState({ currentCoterie: coterie });

	loadCoteries = async () => {
		const coteries = await this.state.contract.methods.getCoteries().call();
		this.setState({ coteries });
		console.info(`${coteries.length} Coteries loaded`);
	};

	createCoterie = async name => {
		// TODO
		// return await this.contract.methods.createCoterie(name).send();
	};

	render = () => (
		<CoterieContext.Provider
			value={{
				coteries: this.state.coteries,
				currentCoterie: this.state.currentCoterie,
				setCurrentCoterie: this.setCurrentCoterie,
				createCoterie: this.createCoterie
			}}
		>
			{this.props.children}
		</CoterieContext.Provider>
	);
}

/*const CoterieContainer = ({ children }) => {
    const { web3, networkId } = useContext(NetworkContext);
    const [contract, setContract] = useState();
    const [coteries, setCoteries] = useState();
    const [currentCoterie, setCurrentCoterie] = useState();

    useEffect(() => {
        // TODO move to class
        const loadCoteries = async () => {
	        const _coteries = await contract.methods.getCoteries().call();
            setCoteries(_coteries);
            console.info('Coteries loaded');
        };

        const createCoterie = async name => {
		    // TODO
		    // return await this.contract.methods.createCoterie(name).send();
	    };
    }, []);

    useEffect(() => {
        web3 && networkId && (async () => {
		    const deployedNetwork = CoterieListContract.networks[networkId];
		    const _contract = new web3.eth.Contract(
			    CoterieListContract.abi,
			    deployedNetwork && deployedNetwork.address
		    );
            setContract(_contract);

    		loadCoteries();
        })();
    }, [web3, networkId]);

    useEffect(() => {
        contract && loadCoteries && loadCoteries();
    }, [contract, loadCoteries]);

    return (
        <CoterieContext.Provider value={{ coteries, currentCoterie, setCurrentCoterie, createCoterie }}>
            {children}
        </CoterieContext.Provider>
    );
}*/

export default CoterieContainer;
