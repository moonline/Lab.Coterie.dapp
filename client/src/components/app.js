import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './header';
import ListSection from './list-section';
import DetailSection from './detail-section';
import LoadingPanel from './loading-panel';

import './app.css';

const App = ({ networkReady }) => {
	if (!networkReady) {
		return <LoadingPanel />;
	}
	return (
		<Container fluid className="vh-100 d-flex flex-column">
			<Row className="flex-grow-0 bg-success">
				<Col className="p-0">
					<Header />
				</Col>
			</Row>
			<Row className="flex-grow-1">
				<Col xs={3} className="bg-dark text-white h-100">
					<ListSection />
				</Col>
				<Col xs={9} className="h-100">
					<DetailSection />
				</Col>
			</Row>
		</Container>
	);
};

export default App;
