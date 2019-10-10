const BasicERC721 = artifacts.require("BasicERC721");
const BasicERC20 = artifacts.require("BasicERC20");

const name      = "testToken";
const symbol    = "tkn";
const decimals  = "2";
const amount    = "1000";

module.exports = function(deployer) {
  // deploys 2 tokens, erc20 and erc721, sets owner as 0xf66.. of 1000 erc20 tokens and erc721 nft with id 1
  deployer.deploy(BasicERC20, name, symbol, decimals, amount);
  deployer.deploy(BasicERC721, name, symbol, owner);
};
