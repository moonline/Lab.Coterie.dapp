import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './section-header.css';

const SectionHeader = ({ actions, children }) => (
	<h2 className="sectionHeader container-fluid">
		<Row>
			<Col>{children}</Col>
			<Col xs="auto">{actions}</Col>
		</Row>
	</h2>
);

export default SectionHeader;
