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
	function numberOfMyVotes() public view returns (uint) {
		return Candidatures.numberOfVotes(candidatures, msg.sender);
	}
    /*
    function vote(address candidate) public {
        return Candidatures.addVote(candidatures, candidate, msg.sender);

        // TODO review membership
    }
    */
    // members
	function getMembers() public view returns (address[] memory) {
		require(
            EnumerableSet.contains(members, msg.sender),
            "PermissionError: Only members can access member list"
        );

		return EnumerableSet.values(members);
	}
}
