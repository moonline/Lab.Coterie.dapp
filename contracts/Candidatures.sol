// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";


library Candidatures {
    struct Candidature {
        // This is not optimal from a privacy perspective. Don't use this in production.
        // This should be replaced by something like a user-choosen identifier/signature not revealing its identity
        EnumerableSet.AddressSet votes;
        bool exists;
    }

    struct CandidatureView {
        address candidate;
        uint votes;
    }

    struct CandidatureList {
        mapping (address => Candidature) items;
        address[] keys;
    }

    function hasCandidature(CandidatureList storage self, address candidate) public view returns (bool) {
        return self.items[candidate].exists == true;
    }

    function numberOfCandidatures(CandidatureList storage self) public view returns (uint) {
        return self.keys.length;
    }

    function addCandidature(CandidatureList storage self, address candidate) public {
        require(!hasCandidature(self, candidate), "CreateError: Candidature already exists");

        self.items[candidate].exists = true;
        self.keys.push(candidate);
    }

    function getCandidatures(CandidatureList storage self) public view returns (CandidatureView[] memory) {
        CandidatureView[] memory candidatureViews = new CandidatureView[](self.keys.length);
        for (uint i = 0; i < self.keys.length; i++) {
            CandidatureView memory candidatureView = CandidatureView(
                self.keys[i],
                EnumerableSet.length(self.items[self.keys[i]].votes)
            );
            candidatureViews[i] = candidatureView;
        }
        return candidatureViews;
    }

    function addVote(CandidatureList storage self, address candidate, address voter) public {
        require(hasCandidature(self, candidate), "NotFoundError: No candidature found for candidate");
        require(candidate != voter, "PermissionError: A candidate can not vote for himself");

        EnumerableSet.add(self.items[candidate].votes, voter);
    }

    function numberOfVotes(CandidatureList storage self, address candidate) public view returns (uint) {
        require(hasCandidature(self, candidate), "NotFoundError: No candidature found for candidate");

        return EnumerableSet.length(self.items[candidate].votes);
    }
}
