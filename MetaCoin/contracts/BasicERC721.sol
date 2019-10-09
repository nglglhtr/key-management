pragma solidity ^0.5.0;
 
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';
 
contract BasicERC721 is ERC721Full, ERC721Mintable {
  constructor(
    string memory _name,
    string memory _symbol,
    address _owner
  ) ERC721Full(_name, _symbol) public {
      addMinter(_owner);
      mint(_owner, 1);
  }
}