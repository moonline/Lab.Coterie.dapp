import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Person as PersonIcon } from 'react-bootstrap-icons';

import AccountCard from '../common/account-card';
import LabelBadge from '../common/lable-badge';

const MemberList = ({ members, currentAccount }) => (
	<Row xs={1} md={3} className="g-3">
		{members.map(member => (
			<Col key={member}>
				<AccountCard account={member} border={member === currentAccount && 'success'}>
					<Card.Text>
						<LabelBadge>{member === currentAccount ? 'Myself' : <PersonIcon />}</LabelBadge>
					</Card.Text>
				</AccountCard>
			</Col>
		))}
	</Row>
);
export default MemberList;
