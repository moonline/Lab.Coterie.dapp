// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Coterie.sol";

contract TestCoterie {

  function testItStoresAValue() public {
    Coterie coterie = new Coterie("Test club");

    Assert.equal(coterie.getCandidature(), 0, "It should have a candidature with 0 votes.");
  }

}
