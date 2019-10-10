pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract BasicERC20 is ERC20, ERC20Detailed {
    uint256 d;
  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint256 _amount
  )
    ERC20Detailed(_name, _symbol, _decimals)
    public
  {
      d = _decimals;
    require(_amount > 0, "amount has to be greater than 0");
    // contract deployer gets entire supply of tokens
    _mint(msg.sender, _amount.mul(10 ** uint256(_decimals)));
  }
  // function caller gets specified amount of tokens
    function mintTokens (uint256 amount) public {
      _mint (msg.sender, amount.mul(10 ** d));
    }
    
}