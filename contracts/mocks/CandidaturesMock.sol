// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Candidatures } from "../Candidatures.sol";


contract CandidaturesMock {
    using Candidatures for Candidatures.CandidatureList;
    using Candidatures for Candidatures.CandidatureView;

    Candidatures.CandidatureList private list;

    function length() public view returns (uint) {
        return Candidatures.length(list);
    }

    function contains(address candidate) public view returns (bool) {
        return Candidatures.contains(list, candidate);
    }

    function add(address candidate) public {
        return Candidatures.add(list, candidate);
    }

    function values() public view returns (Candidatures.CandidatureView[] memory) {
        return Candidatures.values(list);
    }
    
    function vote(address candidate, address voter) public {
        return Candidatures.vote(list, candidate, voter);
    }

    function numberOfVotes(address candidate) public view returns (uint) {
        return Candidatures.numberOfVotes(list, candidate);
    }
}
