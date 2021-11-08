// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import { Coterie } from "./Coterie.sol";


contract CoterieFactory {
	using EnumerableSet for EnumerableSet.AddressSet;
    
    event contractCreated(address coterieAddress);

	EnumerableSet.AddressSet private coteries;

	function createCoterie(string memory name) public returns (Coterie) {
        Coterie coterie = new Coterie(name);
        EnumerableSet.add(coteries, address(coterie));
        // TODO test
        emit contractCreated(address(coterie));
        return coterie;
	}

	function getCoteries() public view returns (address[] memory) {
		return EnumerableSet.values(coteries);
	}
}
