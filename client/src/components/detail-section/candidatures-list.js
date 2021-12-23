import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AccountCard from '../common/account-card';
import FormattedNumber from '../common/formatted-number';

const VoteButton = ({ candidate, gasEstimation, onCandidateVote }) => (
	<Button variant="success" onClick={() => onCandidateVote(candidate)}>
		Vote candidate{' '}
		{gasEstimation && (
			<>
				(~
				<FormattedNumber format="0.0a">{gasEstimation}</FormattedNumber> gas)
			</>
		)}
	</Button>
);

const CandidaturesList = ({ candidatures, estimatedGas, currentAccount, onCandidateVote }) => (
	<Row xs={1} md={3} className="g-3">
		{candidatures.map(candidature => (
			<Col>
				<AccountCard account={candidature.candidate}>
					<Card.Text>{candidature.votes} votes</Card.Text>
					{candidature.candidate === currentAccount ? (
						<Button disabled variant="dark">
							Myself
						</Button>
					) : (
						<VoteButton
							candidate={candidature.candidate}
							onCandidateVote={onCandidateVote}
							gasEstimation={
								estimatedGas.voteCandidate && estimatedGas.voteCandidate[candidature.candidate]
							}
						/>
					)}
				</AccountCard>
			</Col>
		))}
	</Row>
);
export default CandidaturesList;
