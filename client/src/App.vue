<template>
  
</template>

<script>
import Portis from '@portis/web3';
import Web3 from 'web3';
const customNode = {
  nodeUrl: 'https://testnet2.matic.network'
};

const portis = new Portis(
  "15f0ec32-f562-45d6-b3bd-1880c2fd5b74",
  customNode
);

const web3p = new Web3(portis.provider);

import ERC20abi from '../src/util/ERC20abi';
import ERC721abi from '../src/util/ERC721abi';

const ERC20Address = '0x8aC19D9003307d6a3772ed19d8a62cd6F4a9f2c4';
const ERC721Address = '0x99cB8b63aEfDC050694Ebb2957eFeaCed38dD54f';

export default {
  name: 'app',
  data() {
    return {

      web3: web3p,
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
    // getWeb3().then((result) => {
      // this.web3 = result;
      this.ERC20Instance = new this.web3.eth.Contract(ERC20abi, ERC20Address);
      this.ERC721Instance = new this.web3.eth.Contract(ERC721abi, ERC721Address);
      
      this.init ();
    // });
  },
  components: {
    
  },
  methods: {
    init () {
      this.web3.eth.getAccounts().then((accounts) => {
        this.account = accounts[0];
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

</style>
