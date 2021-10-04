// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";


library Candidatures {
    struct Candidature {
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

    function add(CandidatureList storage self, address candidate) public {
        self.items[candidate].exists = true;
        self.keys.push(candidate);
    }

    function contains(CandidatureList storage self, address candidate) public view returns (bool) {
        return self.items[candidate].exists == true;
    }

    function length(CandidatureList storage self) public view returns (uint) {
        return self.keys.length;
    }

    function values(CandidatureList storage self) public view returns (CandidatureView[] memory) {
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
}
