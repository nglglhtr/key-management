<template>
  <div id="app">
    <p>Connected Account: {{ account }}</p>
    <p>Connected to Network (id): {{ netId }} </p>
    <h3>ERC20</h3>
    <p>ERC20 Contract Address: {{ ERC20Address }} </p>
    <p>ERC20 token name: {{ ERC20Name }} </p>
    <p>ERC20 token symbol: {{ ERC20Symbol }} </p>
    <p>ERC20 decimals: {{ ERC20Decimals }} </p>        
    <p>ERC20 total supply: {{ ERC20TotalSupply }} </p>
    <div>
      <input type="text" placeholder="address" id = "transferAddressErc20">
      <input type="text" placeholder="amount" id = "transferAmountErc20">      
      <button v-on:click="transferErc20">Transfer-erc20</button>
      <br>
      <input type="text" placeholder="address" id = "checkBalanceErc20">
      <button v-on:click="checkBalanceErc20">checkBalance-erc20</button>
    </div>
    <h3>ERC721</h3>
    <p>ERC721 Contract Address: {{ ERC721Address }} </p>
    <p>ERC721 token name: {{ ERC721Name }} </p>
    <p>ERC721 token symbol: {{ ERC721Symbol }} </p>
    <p>ERC721 total supply: {{ ERC721TotalSupply }} </p>
    <input type="text" placeholder="address" id = "mintAddressErc721">
    <input type="text" placeholder="tokenId" id = "mintTokenIdErc721">  
    <button v-on:click="mintErc721">mint-erc721</button>
    <br>
    <input type="text" placeholder="address" id = "transferAddressErc721">
    <input type="text" placeholder="tokenId" id = "transferTokenIdErc721">      
    <button v-on:click="transferErc721">Transfer-erc721</button>
    <br>
    <input type="text" placeholder="address" id = "ownerOfErc721">
    <button v-on:click="checkOwnerErc721">ownerof-erc721</button>
    
  </div>
</template>

<script>
// import getWeb3 from '../src/util/web3';
import ERC20abi from '../src/util/ERC20abi';
import ERC721abi from '../src/util/ERC721abi';
import Web3 from 'web3';
var web3m = new Web3(`https://testnet2.matic.network`);

import walletConnector from '../src/util/walletConnect';

const ERC20Address = '0x8aC19D9003307d6a3772ed19d8a62cd6F4a9f2c4';
const ERC721Address = '0x99cB8b63aEfDC050694Ebb2957eFeaCed38dD54f';

export default {
  name: 'app',
  data() {
    return {

      web3: web3m,
      account: null,
      netId: null,

      ERC20Instance: null,
      ERC20Address,
      ERC20Name: null,
      ERC20Symbol: null,
      ERC20TotalSupply: null,
      ERC20Decimals: null,

      ERC721Instance: null,
      ERC721Address,
      ERC721Name: null,
      ERC721Symbol: null,
      ERC721TotalSupply: null,

      boool: null,   
    };
  },
  mounted() {
    console.log (walletConnector);
    this.account = walletConnector.accounts[0];
    this.netId = walletConnector.chainId;

    this.ERC20Instance = new this.web3.eth.Contract(ERC20abi, ERC20Address);
    this.ERC721Instance = new this.web3.eth.Contract(ERC721abi, ERC721Address);

    this.init();
    
  },
  components: {
    
  },
  methods: {
    init () {
      this.ERC20Instance.methods.name().call().then ((n) => this.ERC20Name = n)
      this.ERC20Instance.methods.symbol().call().then((s) => this.ERC20Symbol = s)
      this.ERC20Instance.methods.totalSupply().call().then((res) => this.ERC20TotalSupply = res)
      this.ERC20Instance.methods.decimals().call().then((res) => this.ERC20Decimals = res)
      this.ERC721Instance.methods.name().call().then((s) => this.ERC721Name = s)
      this.ERC721Instance.methods.symbol().call().then((s) => this.ERC721Symbol = s)
      this.ERC721Instance.methods.totalSupply().call().then((res) => this.ERC721TotalSupply = res)
    },
    transferErc20() {
      let address = transferAddressErc20.value;
      let amount = transferAmountErc20.value;

      let functionSig = 'a9059cbb';
      let firstArg = Web3.utils.padLeft(address, 64);
      let secondArg = Web3.utils.padLeft (Web3.utils.toHex(amount).substring(2), 64);
      let txData = '0x' + functionSig + firstArg + secondArg;

      walletConnector.sendTransaction({
        from: this.account,
        to: ERC20Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then ((receipt) => console.log (receipt))

    },
    checkBalanceErc20() {
      let address = checkBalanceErc20.value;
      let functionSig = '70a08231';
      let firstArg = Web3.utils.padLeft(address, 64);

      this.ERC20Instance.methods.balanceOf(address).call ().then((balance) => {
        console.log (balance);
      })

      let txData = '0x' + functionSig + firstArg;

      walletConnector.sendTransaction({
        from: this.account,
        to: ERC20Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then ((receipt) => console.log (receipt))

    },
    mintErc721(){ 
      let address = mintAddressErc721.value;
      let tokenId = mintTokenIdErc721.value;
      let account = this.account;

      console.log ("sending from: ", account);
      console.log ("tokenId: ", tokenId);
      console.log ("sending to: ", address);

      let functionSig = '40c10f19';
      let firstArg = Web3.utils.padLeft(address, 64);
      let secondArg = Web3.utils.padLeft(Web3.utils.toHex(tokenId).substring(2), 64);
      let txData = '0x' + functionSig + firstArg + secondArg;

      walletConnector.sendTransaction({
        from: this.account,
        to: ERC721Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then ((receipt) => console.log (receipt))

    },
    transferErc721(){
      let from = this.account;
      let to = transferAddressErc721.value;
      let tokenId = transferTokenIdErc721.value;

      let functionSig = '23b872dd' ;
      let firstArg = Web3.utils.padLeft(from, 64);
      let secondArg = Web3.utils.padLeft(to, 64);
      let thirdArg = Web3.utils.padLeft(Web3.utils.toHex(tokenId).substring(2), 64);
      
      console.log (thirdArg);
      let txData = '0x' + functionSig + firstArg + secondArg + thirdArg;

      walletConnector.sendTransaction({
        from: this.account,
        to: ERC721Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then ((receipt) => console.log (receipt))
    },
    checkOwnerErc721(){
      let tokenId = ownerOfErc721.value;

      let functionSig = '6352211e';
      let firstArg = Web3.utils.padLeft(Web3.utils.toHex(tokenId).substring(2), 64);

      let txData = '0x' + functionSig + firstArg;

      walletConnector.sendTransaction({
        from: this.account,
        to: ERC721Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then ((receipt) => console.log (receipt))

    }
  }
}
</script>



<style>

</style>
