import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './components/header';
import ListSection from './components/list-section';
import DetailSection from './components/detail-section';

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
					<ListSection />
				</Col>
				<Col xs={9}>
					<DetailSection />
				</Col>
			</Row>
		</Container>
	);
};

export default App;
