import React from 'react';

import Badge from 'react-bootstrap/Badge';

const LabelBadge = ({ children, ...props }) => (
	<span className="h4">
		<Badge bg="secondary" className="fw-normal p-2" {...props}>
			{children}
		</Badge>
	</span>
);

export default LabelBadge;
