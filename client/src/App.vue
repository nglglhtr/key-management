<template>
  <div>
    
<div id = "app">
    <hr>
    <p>Connected Account: {{ account }}</p>
    <p>Connected to Network (id): {{ netId }} </p>
    <hr>

    <div class="columns">
      <div class="column">
        <h3><b>ERC20</b></h3>
    <p>ERC20 Contract Address: {{ ERC20Address }} </p>
    <p>ERC20 token name: {{ ERC20Name }} </p>
    <p>ERC20 token symbol: {{ ERC20Symbol }} </p>
    <p>ERC20 decimals: {{ ERC20Decimals }} </p>        
    <p>ERC20 total supply: {{ ERC20TotalSupply }} </p>
    <hr>
    <div>
      <h3><b>Mint ERC20</b></h3>

      <div class = "columns">
        <div class = "column">
            <b-input placeholder="amount" id = "mintAmountErc20"></b-input>
        </div>
        <div class = "column">
          <b-button v-on:click="mintErc20">Mint-erc20</b-button>
        </div>
      </div>
      <hr>
        <h3><b>Transfer ERC20</b></h3>

      <div class = "columns">
        <div class = "column">
            <b-input placeholder="address" id = "transferAddressErc20"></b-input>
        </div>
        <div class = "column">
            <b-input placeholder="amount" id = "transferAmountErc20"></b-input>
        </div>
        <div class = "column">
          <b-button v-on:click="transferErc20">Transfer-erc20</b-button>
        </div>
      </div>
      <hr>
        <h3><b>Check Balance ERC20</b></h3>
      <div class = "columns">
      <div class = "column">
      <b-input type="text" placeholder="address" id = "checkBalanceErc20"></b-input>
      </div>
      <div class = "column">
        <b-button v-on:click="checkBalanceErc20">checkBalance-erc20</b-button>
      </div>
      </div>
    </div>
      </div>
      <div class="column">
        <h3><b>ERC721</b></h3>
    <p>ERC721 Contract Address: {{ ERC721Address }} </p>
    <p>ERC721 token name: {{ ERC721Name }} </p>
    <p>ERC721 token symbol: {{ ERC721Symbol }} </p>
    <p>ERC721 total supply: {{ ERC721TotalSupply }} </p>
    <br>
    <hr>
    <h3><b>Mint ERC721</b></h3>
    <div class = "columns">
      <div class = "column">
        <b-input type="text" placeholder="tokenId" id = "mintTokenIdErc721"> </b-input>
      </div>
      <div class = "column">
        <b-button v-on:click="mintErc721">mint-erc721</b-button>        
      </div>
    </div>
      <hr>
    <h3><b>Transfer ERC721</b></h3>      
      <div class = "columns">
      <div class = "column">
      <b-input type="text" placeholder="address" id = "transferAddressErc721"> </b-input>
      </div>
      <div class = "column">
      <b-input type="text" placeholder="tokenId" id = "transferTokenIdErc721">   </b-input>   
      </div>
      <div class = "column">
      <b-button v-on:click="transferErc721">Transfer-erc721</b-button>
      </div>
      </div>
      <hr>
    <h3><b>Owner of ERC721</b></h3>      
      <div class = "columns">
      <div class = "column">
      <b-input type="text" placeholder="address" id = "ownerOfErc721"> </b-input>     
      </div>
      <div class = "column">
      <b-button v-on:click="checkOwnerErc721">ownerof-erc721</b-button>      
      </div>
      </div>
      </div>
    </div>
    <hr>
</div>
  </div>
</template>

<script>
// import getWeb3 from '../src/util/web3';
import ERC20abi from '../src/util/ERC20abi';
import ERC721abi from '../src/util/ERC721abi';
import Web3 from 'web3';
var web3m = new Web3(`https://testnet2.matic.network`);
import walletConnector from '../src/util/walletConnect';

const ERC20Address = '0xe28c057F7a7b7450B01Bda93a0e8193cDeA033fE';
const ERC721Address = '0x74A090B40eDe534c557295e90A35a7305E7c45c0';

export default {
  name: 'app',
  data() {
    return {
      maticProvider:null,
      matic: null,
      account: null,
      netId: null,
      web3: web3m,
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
    console.log ("erc20instance", this.ERC20Instance);
    this.ERC721Instance = new this.web3.eth.Contract(ERC721abi, ERC721Address);
    console.log ("erc721instance", this.ERC721Instance);

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
    mintErc20 () {
      let amount = mintAmountErc20.value;
      let functionSig = '97304ced';

      let firstArg = Web3.utils.padLeft (Web3.utils.toHex(amount).substring(2), 64);
      let txData = '0x' + functionSig + firstArg;

      let signedTx;

      walletConnector.signTransaction({
        from: this.account,
        to: ERC20Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then((tx) => {
        this.web3.eth.sendSignedTransaction(tx).then((receipt)=> console.log (receipt))
      })
    },

    transferErc20() {
      let address = transferAddressErc20.value;
      let amount = transferAmountErc20.value;
      
      let functionSig = 'a9059cbb';
      let firstArg = Web3.utils.padLeft(address, 64);
      let secondArg = Web3.utils.padLeft (Web3.utils.toHex(amount).substring(2), 64);
      let txData = '0x' + functionSig + firstArg + secondArg;

      walletConnector.signTransaction({
        from: this.account,
        to: ERC20Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then((tx) => {
        this.web3.eth.sendSignedTransaction(tx).then((receipt)=> console.log (receipt))
      })

    },
    checkBalanceErc20() {
      let address = checkBalanceErc20.value;
      let functionSig = '70a08231';
      let firstArg = Web3.utils.padLeft(address, 64);

      this.ERC20Instance.methods.balanceOf(address).call ().then((balance) => {
        console.log (balance);
      })
    },
    mintErc721(){ 
      // let address = mintAddressErc721.value;
      let tokenId = mintTokenIdErc721.value;
      // let account = this.account;

      // console.log ("sending from: ", account);
      // console.log ("tokenId: ", tokenId);
      // console.log ("sending to: ", address);

      let functionSig = 'c634d032';
      // let firstArg = Web3.utils.padLeft(address, 64);
      let secondArg = Web3.utils.padLeft(Web3.utils.toHex(tokenId).substring(2), 64);
      let txData = '0x' + functionSig + secondArg;
      walletConnector.signTransaction({
        from: this.account,
        to: ERC721Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then((tx) => {
        this.web3.eth.sendSignedTransaction(tx).then((receipt)=> console.log (receipt))
      })



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

      walletConnector.signTransaction({
        from: this.account,
        to: ERC20Address,
        gas: 800000,
        gasPrice: 0,
        data: txData,
      }).then((tx) => {
        this.web3.eth.sendSignedTransaction(tx).then((receipt)=> console.log (receipt))
      })


    },
    checkOwnerErc721(){
      let tokenId = ownerOfErc721.value;

      this.ERC721Instance.methods.ownerOf(tokenId).call().then((add) => console.log (add))
    }
  }
}
</script>



<style>
#app {
  margin: 40px;
}
</style>
