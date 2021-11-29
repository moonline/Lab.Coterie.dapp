import React, { useContext } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import CoterieContext from '../context/coterie-context';

import NewCoterieForm from './new-coterie-form';
import Account from './account';

const CoterieDetail = () => {
	const { currentCoterie, setCurrentCoterie, createCoterie, estimatedGas } =
		useContext(CoterieContext);

	if (currentCoterie !== null) {
		return currentCoterie.id === 'NEW' ? (
			<NewCoterieForm
				setCurrentCoterie={setCurrentCoterie}
				createCoterie={createCoterie}
				currentCoterie={currentCoterie}
				estimatedGas={estimatedGas}
			/>
		) : (
			<>
				<h2>Coterie ({currentCoterie.name || currentCoterie.id})</h2>
				{currentCoterie.hasCandidature ? (
					<>
						<h3>My candidature</h3>
						<p>{currentCoterie.myCandidatureVotationResult}</p>
					</>
				) : (
					<Button variant="primary">Create candidature</Button>
				)}

				<h3>
					Candidatures ({currentCoterie.numberOfCandidatures})
					{currentCoterie.hasCandidature && ' - CANDIDATE'}
				</h3>
				{currentCoterie.isMember && currentCoterie.candidatures && (
					<ul>
						{currentCoterie.candidatures.map(candidature => (
							<li key={candidature.candidate}>
								<Account id={candidature.candidate} />:{candidature.votes}
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
							</li>
						))}
					</ul>
				)}
			</>
		);
	} else {
		return <Alert variant="primary">Select a coterie or create a new one.</Alert>;
	}
};

export default CoterieDetail;
