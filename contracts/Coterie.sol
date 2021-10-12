// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import { Candidatures } from "./Candidatures.sol";


contract Coterie {
	using EnumerableSet for EnumerableSet.AddressSet;
    using Candidatures for Candidatures.CandidatureList;
    using Candidatures for Candidatures.CandidatureView;
    

    string public name;
	EnumerableSet.AddressSet private members;
	Candidatures.CandidatureList private candidatures;

	constructor(string memory _name) {
		name = _name;
        Candidatures.addCandidature(candidatures, msg.sender);
		EnumerableSet.add(members, msg.sender);
	}

    // candidatures
	function createCandidature() public {
        Candidatures.addCandidature(candidatures, msg.sender);
	}

	function getCandidatures() public view returns (Candidatures.CandidatureView[] memory) {
		require(
            EnumerableSet.contains(members, msg.sender),
            "PermissionError: Only members can access candidatures"
        );

        return Candidatures.getCandidatures(candidatures);
	}

    // votes
	function numberOfVotes(address candidate) public view returns (uint) {
		return Candidatures.numberOfVotes(candidatures, candidate);
	}

	function numberOfMyVotes() public view returns (uint) {
		return Candidatures.numberOfVotes(candidatures, msg.sender);
	}

    function getVotationResult(address candidate) public view returns (uint) {
        bool isMember = EnumerableSet.contains(members, candidate);
        uint8 membershipSelfVote = isMember ? 1 : 0;
        uint votes = numberOfVotes(candidate) + membershipSelfVote;

        return ((votes * 1000 / EnumerableSet.length(members)) + 5) / 10;
    }

    function getVotationResult2(address candidate) public view returns (uint, uint, uint, uint) {
        bool isMember = EnumerableSet.contains(members, candidate);
        uint8 membershipSelfVote = isMember ? 1 : 0;
        uint votes = numberOfVotes(candidate) + membershipSelfVote;

        return (((votes * 1000 / EnumerableSet.length(members)) + 5) / 10, EnumerableSet.length(members), votes, votes * 100 / EnumerableSet.length(members));
    }

    function vote(address candidate) public {
        require(
            EnumerableSet.contains(members, msg.sender),
            "PermissionError: Only members can vote candidatures"
        );
        Candidatures.addVote(candidatures, candidate, msg.sender);

        reviewMemberShip(candidate);
    }

    // members
    function reviewMemberShip(address candidate) internal {
        uint16 MEMBERSHIP_BREAKPOINT = 50;
        bool isMember = EnumerableSet.contains(members, candidate);

        if (getVotationResult(candidate) > MEMBERSHIP_BREAKPOINT) {
            if (!isMember) {
                EnumerableSet.add(members, candidate);
            }
        } else {
            if (isMember) {
                EnumerableSet.remove(members, candidate);
            }
        }
    }

	function getMembers() public view returns (address[] memory) {
		require(
            EnumerableSet.contains(members, msg.sender),
            "PermissionError: Only members can access member list"
        );

		return EnumerableSet.values(members);
	}
}
