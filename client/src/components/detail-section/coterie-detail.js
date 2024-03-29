import React, { useContext } from 'react';
import Web3 from 'web3';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PatchPlusFill as PatchPlusIcon } from 'react-bootstrap-icons';

import AccountContext from '../../context/account-context';
import CoterieContext from '../../context/coterie-context';

import FormattedNumber from '../common/formatted-number';
import SectionHeader from '../common/section-header';
import DoughnutChart from '../common/doughnut-chart';

import CandidaturesList from './candidatures-list';
import MemberList from './member-list';

const CoterieDetail = () => {
	const { currentAccount } = useContext(AccountContext);
	const { currentCoterie, estimatedGas, createCandidature, voteCandidate } =
		useContext(CoterieContext);

	return (
		<>
			<SectionHeader subTitle={currentCoterie.id}>{currentCoterie.name}</SectionHeader>
			{currentCoterie.hasCandidature && (
				<>
					<h3>My candidature</h3>
					<Card className="text-center my-2" style={{ width: '8rem' }}>
						<Card.Body>
							{currentCoterie.myCandidatureVotationResult && (
								<DoughnutChart
									percent={Web3.utils.toNumber(currentCoterie.myCandidatureVotationResult) / 100}
								/>
							)}
						</Card.Body>
						<Card.Footer>{currentCoterie.myCandidatureVotationResult}%</Card.Footer>
					</Card>
				</>
			)}

			<h3>Candidates ({currentCoterie.numberOfCandidatures})</h3>
			{!currentCoterie.hasCandidature && (
				<Button variant="success" onClick={createCandidature}>
					<PatchPlusIcon />
					&nbsp; Create candidature (~
					<FormattedNumber format="0.0a">{estimatedGas.createCandidature}</FormattedNumber> gas
					cost)
				</Button>
			)}
			{currentCoterie.isMember && currentCoterie.candidatures ? (
				<CandidaturesList
					candidatures={currentCoterie.candidatures}
					estimatedGas={estimatedGas}
					currentAccount={currentAccount}
					onCandidateVote={voteCandidate}
					numberOfMembers={currentCoterie.members.length}
				/>
			) : (
				<p className="text-muted py-2">Only members can access candidature list</p>
			)}

			<h3>Members ({currentCoterie.numberOfMembers})</h3>
			{currentCoterie.isMember && currentCoterie.members ? (
				<MemberList members={currentCoterie.members} currentAccount={currentAccount} />
			) : (
				<p className="text-muted py-2">Only members can access member list</p>
			)}
		</>
	);
};

export default CoterieDetail;
