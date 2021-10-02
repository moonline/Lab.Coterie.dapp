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
	mapping (address => Candidature) private candidatures;

	constructor(string memory _name) {
		name = _name;      
        candidatures[msg.sender].exists = true;
		EnumerableSet.add(members, msg.sender);
	}

	function createCandidature() public {	
        require(candidatures[msg.sender].exists == false, "CreateError: Candidature does already exist");

        candidatures[msg.sender].exists = true;
	}

	//function getCandidatures() {
		// TODO implement candidature map
		//require(contains(members,msg.sender), "PermissionError: Only members can access candidatures");
	//}

    // get number of votes for candidate
	function getCandidature() public view returns (uint) {
		require(candidatures[msg.sender].exists == true, "NotFoundError: Candidature does not exist");

		return EnumerableSet.length(candidatures[msg.sender].votes);
	}

    // get all members
	function getMembers() public view returns (address[] memory) {
		require(
            EnumerableSet.contains(members, msg.sender) == true,
            "PermissionError: Only members can access member list"
        );

		return EnumerableSet.values(members);
	}
}
