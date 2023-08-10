// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Candidatures} from "../Candidatures.sol";

contract CandidaturesMock {
    using Candidatures for Candidatures.CandidatureList;
    using Candidatures for Candidatures.CandidatureView;

    Candidatures.CandidatureList private list;

    function numberOfCandidatures() public view returns (uint256) {
        return Candidatures.numberOfCandidatures(list);
    }

    function hasCandidature(address candidate) public view returns (bool) {
        return Candidatures.hasCandidature(list, candidate);
    }

    function addCandidature(address candidate) public {
        return Candidatures.addCandidature(list, candidate);
    }

    function removeCandidature(address candidate) public {
        return Candidatures.removeCandidature(list, candidate);
    }

    function getCandidatures() public view returns (Candidatures.CandidatureView[] memory) {
        return Candidatures.getCandidatures(list);
    }

    function addVote(address candidate, address voter) public {
        return Candidatures.addVote(list, candidate, voter);
    }

    function numberOfVotes(address candidate) public view returns (uint256) {
        return Candidatures.numberOfVotes(list, candidate);
    }

    function removeVote(address candidate, address voter) public {
        return Candidatures.removeVote(list, candidate, voter);
    }
}
