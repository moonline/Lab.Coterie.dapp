// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

struct Candidature {
    EnumerableSet.AddressSet votes;
    bool exists;
}

contract Coterie {
	using EnumerableSet for EnumerableSet.AddressSet;

    string public name;
	EnumerableSet.AddressSet private members;
	mapping (address => Candidature) candidatures;

    // TODO check storage
	constructor(string memory coterieName) {
		name = coterieName;
      
		Candidature storage candidature = candidatures[msg.sender];
        candidature.exists = true;

		EnumerableSet.add(members, msg.sender);
	}

	function createCandidature() public {	
        require(candidatures[msg.sender].exists == false, "CreateError: Candidature does already exist");

		Candidature storage candidature = candidatures[msg.sender];
        candidature.exists = true;
	}

	//function getCandidatures() {
		// TODO implement candidature map
		//require(contains(members,msg.sender), "PermissionError: Only members can access candidatures");
	//}

    // get #votes
	function getCandidature() public view returns (uint) {
		require(candidatures[msg.sender].exists == true, "NotFoundError: Candidature does not exist");

		return EnumerableSet.length(candidatures[msg.sender].votes);
	}

    // TODO check return memory
	function getMembers() public view returns (address[] memory) {
		require(EnumerableSet.contains(members, msg.sender) == true, "PermissionError: Only members can access member list");

		return EnumerableSet.values(members);
	}
}
