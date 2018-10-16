Part 1:

Contract implements ERC721Mintable and ERC721Full. The requirement to have the mint() function meant that a Mintable contract was needed.
Star tokens require Dec, Mag, Cent, and Story, in addition to their token ID and name.
Smart contract prevents stars with the same coordinates from being added. This is done by storing a mapping of (keccak256(abi.encodePacked(Dec, Mag, Cent)) => bool).
Smart contract contains all required functions, and the expected response from tokenIdToStarInfo is correct.

Part 2:

There are tests for all functions in the requirements. Run `truffle test` from the smart_contracts directory.

Part 3:

Contract creation transaction id: 0xc92376f4c718b5f009b9755bf92db5e31a6f8faf3640784f559f996bb2ac14ac

Contract Address: 0x47239e7f1a12f9d6385bd9cb93d4522e423f971e

createStar transaction id: https://rinkeby.etherscan.io/tx/0xb60336c7ed4d0d5049dabf1e710f6565ec647365cf41ed1acc3c3a62cd912d6b

putStarUpForSale transaction id: https://rinkeby.etherscan.io/tx/0xbfbe95aa29b7e6984ba6be29590126bd4d959e95bc2cd56573b26d1100aa7e55

tokenId: 12345
tokenPrice: 1000

Part 4:

In order to get Metamask to play nice with this HTML file, I installed 'http-server' (https://www.npmjs.com/package/http-server) and ran it from the project root directory.
Ensure you're on the Rinkeby network and that you have some ETH to work with.
You can create a new star, and then look it up.
