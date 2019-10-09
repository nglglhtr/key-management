<template>

  <div>
    
<div id = "app">
    <hr>
    <p>Connected Account: {{ account }}</p>
    <p>Connected to Network (id): {{ netId }} </p>
    <p>Contracts deployed by: {{ deployedBy }} </p>
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
        <b-input type="text" placeholder="address" id = "mintAddressErc721"> </b-input>      
      </div>
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
import getWeb3 from '../src/util/web3';
import ERC20abi from '../src/util/ERC20abi';
import ERC721abi from '../src/util/ERC721abi';

const ERC20Address = '0x8aC19D9003307d6a3772ed19d8a62cd6F4a9f2c4';
const ERC721Address = '0x99cB8b63aEfDC050694Ebb2957eFeaCed38dD54f';
const deployedBy = '0x9fB29AAc15b9A4B7F17c3385939b007540f4d791';

export default {
  name: 'app',
  data() {
    return {

      web3: null,
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

      deployedBy,   
    };
  },
  mounted() {
    getWeb3().then((result) => {
      this.web3 = result;
      this.ERC20Instance = new this.web3.eth.Contract(ERC20abi, ERC20Address);
      this.ERC721Instance = new this.web3.eth.Contract(ERC721abi, ERC721Address);
      
      this.init ();
    });
  },
  components: {
    
  },
  methods: {
    init () {
      this.web3.eth.getAccounts().then((accounts) => {
        this.account = accounts[0];
        // this.ERC721Instance.methods.isMinter(this.account).call().then((res) => console.log (res))
      })
      this.web3.eth.net.getId().then((id) => this.netId = id)

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
      this.ERC20Instance.methods.transfer(address,amount).send({
        from:this.account,
        gasPrice: 0
      }).then ((receipt) => {
        console.log (receipt)
      })
    },
    checkBalanceErc20() {
      let address = checkBalanceErc20.value;
      this.ERC20Instance.methods.balanceOf(address).call ().then((balance) => {
        console.log (balance);
      })
    },
    mintErc721(){ 
      let address = mintAddressErc721.value;
      let tokenId = mintTokenIdErc721.value;
      let account = this.account;
      console.log ("sending from: ", account);
      console.log ("tokenId: ", tokenId);
      console.log ("sending to: ", address);

      this.ERC721Instance.methods.mint(address,tokenId).send ({
        from: this.account,
        gasPrice: 0
      }).then((receipt) => {
        console.log (receipt)
      })
    },
    transferErc721(){
      let from = this.account;
      let to = transferAddressErc721.value;
      let tokenId = transferTokenIdErc721.value;
      this.ERC721Instance.methods.safeTransferFrom(from, to, tokenId).send({
        from: this.account,
        gasPrice: 0,
      }).then((receipt) => console.log (receipt))
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
