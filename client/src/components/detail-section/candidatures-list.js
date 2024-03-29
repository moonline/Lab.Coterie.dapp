import React from 'react';
import Web3 from 'web3';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PatchCheckFill as PatchCheckIcon } from 'react-bootstrap-icons';

import AccountCard from '../common/account-card';
import FormattedNumber from '../common/formatted-number';
import LabelBadge from '../common/lable-badge';
import DoughnutChart from '../common/doughnut-chart';

import './candidatures-list.css';

const VoteButton = ({ candidate, gasEstimation, onCandidateVote }) => (
	<Button variant="success" onClick={() => onCandidateVote(candidate)}>
		<PatchCheckIcon />
		&nbsp; Vote candidate{' '}
		{gasEstimation && (
			<>
				(~
				<FormattedNumber format="0.0a">{gasEstimation}</FormattedNumber> gas)
			</>
		)}
	</Button>
);

const CandidaturesList = ({
	candidatures,
	estimatedGas,
	currentAccount,
	numberOfMembers,
	onCandidateVote
}) => (
	<Row xs={1} md={3} className="g-3">
		{candidatures.map(({ candidate, votes }) => (
			<Col key={candidate}>
				<AccountCard
					className="candidature-list-item text-center"
					account={candidate}
					border={candidate === currentAccount && 'success'}
				>
					<Card.Text>
						<div className="votes">
							<DoughnutChart
								percent={Web3.utils.toNumber(votes) / (Web3.utils.toNumber(numberOfMembers) - 1)}
							/>
						</div>
						{votes} votes
					</Card.Text>
					{candidate === currentAccount ? (
						<LabelBadge>Myself</LabelBadge>
					) : (
						<VoteButton
							candidate={candidate}
							onCandidateVote={onCandidateVote}
							gasEstimation={estimatedGas.voteCandidate && estimatedGas.voteCandidate[candidate]}
						/>
					)}
				</AccountCard>
			</Col>
		))}
	</Row>
);
export default CandidaturesList;
