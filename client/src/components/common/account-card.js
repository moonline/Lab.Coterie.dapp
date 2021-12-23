import React from 'react';

import Card from 'react-bootstrap/Card';
import { PeopleFill as PeopleIcon } from 'react-bootstrap-icons';

import Account from './account';

const AccountCard = ({ account, children }) => (
	<Card className="text-center">
		<Card.Header>
			<PeopleIcon size={72} />
			<Card.Title>
				<Account id={account} icon={null} />
			</Card.Title>
		</Card.Header>
		<Card.Body>{children}</Card.Body>
	</Card>
);
export default AccountCard;
