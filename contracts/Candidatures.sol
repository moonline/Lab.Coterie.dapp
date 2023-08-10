// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

library Candidatures {
    struct Candidature {
        // This is not optimal from a privacy perspective. Don't use this in production.
        // This should be replaced by something like an anonymous signature not revealing its identity
        EnumerableSet.AddressSet votes;
        uint256 keyIndex;
        bool exists;
    }

    struct CandidatureView {
        address candidate;
        uint256 votes;
    }

    struct CandidatureList {
        mapping(address => Candidature) items;
        address[] keys;
    }

    // candidatures
    function hasCandidature(
        CandidatureList storage self,
        address candidate
    ) public view returns (bool) {
        return self.items[candidate].exists == true;
    }

    function numberOfCandidatures(CandidatureList storage self) public view returns (uint256) {
        return self.keys.length;
    }

    function addCandidature(CandidatureList storage self, address candidate) public {
        require(!hasCandidature(self, candidate), "CreateError: Candidature already exists");

        self.items[candidate].exists = true;
        self.keys.push(candidate);
        self.items[candidate].keyIndex = self.keys.length - 1;
    }

    // remove candidature and move last candidature to its place
    // this is cheaper than moving all the items
    function removeCandidature(CandidatureList storage self, address candidate) public {
        require(
            hasCandidature(self, candidate),
            "NotFoundError: No candidature found for candidate"
        );

        uint256 keyIndex = self.items[candidate].keyIndex;
        delete self.items[candidate];

        if (self.keys.length > 1) {
            self.keys[keyIndex] = self.keys[self.keys.length - 1];
            self.items[self.keys[keyIndex]].keyIndex = keyIndex;
        }
        self.keys.pop();
    }

    function getCandidatures(
        CandidatureList storage self
    ) public view returns (CandidatureView[] memory) {
        CandidatureView[] memory candidatureViews = new CandidatureView[](self.keys.length);
        for (uint256 i = 0; i < self.keys.length; i++) {
            CandidatureView memory candidatureView = CandidatureView(
                self.keys[i],
                EnumerableSet.length(self.items[self.keys[i]].votes)
            );
            candidatureViews[i] = candidatureView;
        }
        return candidatureViews;
    }

    // votes
    function numberOfVotes(
        CandidatureList storage self,
        address candidate
    ) public view returns (uint256) {
        require(
            hasCandidature(self, candidate),
            "NotFoundError: No candidature found for candidate"
        );

        return EnumerableSet.length(self.items[candidate].votes);
    }

    function addVote(CandidatureList storage self, address candidate, address voter) public {
        require(
            hasCandidature(self, candidate),
            "NotFoundError: No candidature found for candidate"
        );
        require(candidate != voter, "PermissionError: A candidate can not vote for himself");

        EnumerableSet.add(self.items[candidate].votes, voter);
    }

    function removeVote(CandidatureList storage self, address candidate, address voter) public {
        require(
            hasCandidature(self, candidate),
            "NotFoundError: No candidature found for candidate"
        );
        EnumerableSet.remove(self.items[candidate].votes, voter);
    }
}
