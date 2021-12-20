import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';

import AccountContext from '../context/account-context';
import CoterieContext from '../context/coterie-context';

import Account from './account';
import FormattedNumber from './formatted-number';
import SectionHeader from './section-header';

const CoterieDetail = () => {
	const { currentAccount } = useContext(AccountContext);
	const { currentCoterie, estimatedGas, createCandidature, voteCandidate } =
		useContext(CoterieContext);

	return (
		<>
			<SectionHeader>{currentCoterie.name || `Coterie (${currentCoterie.id})`}</SectionHeader>
			{currentCoterie.hasCandidature ? (
				<>
					<h3>My candidature</h3>
					<p>{currentCoterie.myCandidatureVotationResult}</p>
				</>
			) : (
				<Button variant="primary" onClick={createCandidature}>
					Create candidature (~
					<FormattedNumber format="0.0a">{estimatedGas.createCandidature}</FormattedNumber> gas
					cost)
				</Button>
			)}

			<h3>
				Candidates ({currentCoterie.numberOfCandidatures})
				{currentCoterie.hasCandidature && ' - CANDIDATE'}
			</h3>
			{currentCoterie.isMember && currentCoterie.candidatures && (
				<ul>
					{currentCoterie.candidatures.map(candidature => (
						<li key={candidature.candidate}>
							<Account id={candidature.candidate} />: {candidature.votes}
							{candidature.candidate === currentAccount ? (
								' - MYSELF'
							) : (
								<Button variant="primary" onClick={() => voteCandidate(candidature.candidate)}>
									Vote candidate{' '}
									{estimatedGas.voteCandidate && (
										<>
											(~
											<FormattedNumber format="0.0a">
												{estimatedGas.voteCandidate[candidature.candidate]}
											</FormattedNumber>{' '}
											gas)
										</>
									)}
								</Button>
							)}
						</li>
					))}
				</ul>
			)}

			<h3>
				Members ({currentCoterie.numberOfMembers}){currentCoterie.isMember && ' - MEMBER'}
			</h3>
			{currentCoterie.isMember && currentCoterie.members && (
				<ul>
					{currentCoterie.members.map(member => (
						<li key={member}>
							<Account id={member} />
							{member === currentAccount && ' - MYSELF'}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default CoterieDetail;
