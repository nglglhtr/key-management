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

import WalletConnectProvider from "@maticnetwork/walletconnect-provider"
import Web3 from "web3"
import Matic from "maticjs"

const maticProvider = new WalletConnectProvider({
      host: `https://testnet2.matic.network`,
      callbacks: {
        onConnect: console.log('connected'),
        onDisconnect: console.log('disconnected!')
      }
    })
const ropstenProvider = new WalletConnectProvider({
      host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
      callbacks: {
        onConnect: console.log('connected'),
        onDisconnect: console.log('disconnected')
      }
})

console.log (ropstenProvider);
console.log (maticProvider)

const maticWeb3 = new Web3(maticProvider)
console.log (maticWeb3)
const ropstenWeb3 = new Web3(ropstenProvider)
    
const maticObj = new Matic({
  maticProvider: maticProvider,
  parentProvider: ropstenProvider,
  rootChainAddress: "0x60e2b19b9a87a3f37827f2c8c8306be718a5f9b4",
  withdrawManagerAddress: "0x4ef2b60cdd4611fa0bc815792acc14de4c158d22",
  depositManagerAddress: "0x4072fab2a132bf98207cbfcd2c341adb904a67e9",
  syncerUrl: "https://matic-syncer2.api.matic.network/api/v1",
  watcherUrl: "https://ropsten-watcher2.api.matic.network/api/v1",
  maticWethAddress: "0x31074c34a757a4b9FC45169C58068F43B717b2D0"
})

// import Web3 from 'web3';
// var web3m = new Web3(`https://testnet2.matic.network`);
// import walletConnector from '../src/util/walletConnect';

// const maticProvider = `https://testnet2.matic.network`;
const ERC20Address = '0xe28c057F7a7b7450B01Bda93a0e8193cDeA033fE';
const ERC721Address = '0x74A090B40eDe534c557295e90A35a7305E7c45c0';

export default {
  name: 'app',
  data() {
    return {
      // maticProvider:null,
      // ropstenProvider: null,
      // maticObj: null,

      // matic: null,
      account: null,
      netId: null,
      // web3: web3m,
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

      // boool: null,   
    };
  },
  mounted() {
    maticWeb3.eth
      .getAccounts()
      .then(accounts => {
        // set address
        this.account = accounts[0]
      })

    this.ERC20Instance = new maticWeb3.eth.Contract(ERC20abi, ERC20Address);
    console.log ("erc20instance", this.ERC20Instance);
    this.ERC721Instance = new maticWeb3.eth.Contract(ERC721abi, ERC721Address);
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
      console.log (this.ERC20Instance.methods.mintTokens(amount).encodeABI());
      const tx = {
        from: this.account, // Required
        to: ERC20Address, // Required (for non contract deployments)
        gas: 800000,
        gasPrice: 0,
        data: this.ERC20Instance.methods.mintTokens(amount).encodeABI(), // Required
        gasPrice: "0x0", // Required
      }
      maticWeb3.eth.signTransaction(tx).then((result) => {
        console.log ("sending from: ", this.account);
        maticWeb3.eth.sendSignedTransaction(result).then((receipt)=> console.log (receipt))
      })
    },

    transferErc20() {
      let address = transferAddressErc20.value;
      let amount = transferAmountErc20.value;
      const tx = {
        from: this.account, // Required
        to: ERC20Address, // Required (for non contract deployments)
        gas: 800000,
        gasPrice: 0,
        data: this.ERC20Instance.methods.transfer(address,amount).encodeABI(), // Required
        gasPrice: "0x0", // Required
      }
      maticWeb3.eth.signTransaction(tx).then((result) => {
        maticWeb3.eth.sendSignedTransaction(result).then((receipt)=> console.log (receipt))
      })
    },
    checkBalanceErc20() {
      let address = checkBalanceErc20.value;
      this.ERC20Instance.methods.balanceOf(address).call ().then((balance) => {
        console.log (balance);
      })
    },
    mintErc721(){ 
      let tokenId = mintTokenIdErc721.value;
      const tx = {
        from: this.account, // Required
        to: ERC721Address, // Required (for non contract deployments)
        gas: 800000,
        gasPrice: 0,
        data: this.ERC721Instance.methods.mintToken(tokenId).encodeABI(), // Required
        gasPrice: "0x0", // Required
      }
      maticWeb3.eth.signTransaction(tx).then((result) => {
        maticWeb3.eth.sendSignedTransaction(result).then((receipt)=> console.log (receipt))
      })
    },
    transferErc721(){
      let from = this.account;
      let to = transferAddressErc721.value;
      let tokenId = transferTokenIdErc721.value;
      const tx = {
        from: this.account, // Required
        to: ERC721Address, // Required (for non contract deployments)
        gas: 800000,
        gasPrice: 0,
        data: this.ERC721Instance.methods.transferFrom(from,to,tokenId).encodeABI(), // Required
        gasPrice: "0x0", // Required
      }
      maticWeb3.eth.signTransaction(tx).then((result) => {
        maticWeb3.eth.sendSignedTransaction(result).then((receipt)=> console.log (receipt))
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
