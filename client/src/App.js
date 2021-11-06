import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './components/header';
import CoterieList from './components/coterie-list';
import CoterieDetail from './components/coterie-detail';

import './App.css';

const App = ({ networkReady }) => {
	if (!networkReady) {
		return <Alert variant="primary">Connecting to network...</Alert>;
	}
	return (
		<Container fluid>
			<Row>
				<Col>
					<Header />
				</Col>
			</Row>
			<Row>
				<Col xs={3}>
					<CoterieList />
				</Col>
				<Col xs={9}>
					<CoterieDetail />
				</Col>
			</Row>
		</Container>
	);
};

export default App;
