import React from 'react';

import { Person as PersonIcon } from 'react-bootstrap-icons';

const Account = ({ id, icon }) => (
	<>
		{icon}
		&nbsp;
		<span title={id}>{id ? id.slice(-10) : '???'}</span>
	</>
);
Account.defaultProps = {
	icon: <PersonIcon />
};

export default Account;
