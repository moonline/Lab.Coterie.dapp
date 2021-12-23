import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import AccountCard from '../common/account-card';

const MemberList = ({ members, currentAccount }) => (
	<Row xs={1} md={3} className="g-3">
		{members.map(member => (
			<Col>
				<AccountCard account={member}>
					<Card.Text>
						{member === currentAccount && 'MYSELF'}
					</Card.Text>
				</AccountCard>
			</Col>
		))}
	</Row>
);
export default MemberList;
