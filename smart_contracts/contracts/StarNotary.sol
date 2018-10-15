pragma solidity ^0.4.25;

import 'penzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';

contract StarNotary is ERC721 { 

    struct Star { 
        string name;
        string story;
        string Dec;
        string Mag;
        string Cent;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public starCoordinates;

    function createStar(string _name, uint256 _tokenId, string _story, string _Dec, string _Mag, string _Cent) public { 
        require(!starCoordinates[_concatenateCoordinates(_Dec, _Mag, _Cent)], "Star already exists");
        Star memory newStar = Star(_name, _story, _Dec, _Mag, _Cent);

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
        starCoordinates[_concatenateCoordinates(_Dec, _Mag, _Cent)] = true;
    }

    function _concatenateCoordinates(string Dec, string Mag, string Cent) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(Dec, Mag, Cent));
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function checkIfStarExist(string Dec, string Mag, string Cent) public view returns (bool) {
        return starCoordinates[_concatenateCoordinates(Dec, Mag, Cent)];
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }
}