import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './section-header.css';

const SectionHeader = ({ actions, children, subTitle }) => (
	<h2 className="section-header container-fluid">
		<Row className="align-items-baseline">
			<Col>{children}</Col>
			{subTitle && (
				<Col xs="auto">
					<p class="h6 m-0">{subTitle}</p>
				</Col>
			)}
			{actions && <Col xs="auto">{actions}</Col>}
		</Row>
	</h2>
);

export default SectionHeader;
