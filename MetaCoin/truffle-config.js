const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
    networks: {
      development: {
       host: "127.0.0.1",     // Localhost (default: none)
       port: 8545,            // Standard Ethereum port (default: none)
       network_id: "*",       // Any network (default: none)
      },
      maticTestnet: {
        provider: () => new HDWalletProvider(mnemonic, `https://testnet2.matic.network`),
        network_id: "*",       
        gas: 5500000,    
        gasPrice: 0,    
        confirmations: 2,   
        timeoutBlocks: 200,  
        skipDryRun: true     
      },
      maticAlphaMainnet: {
        provider: () => new HDWalletProvider(mnemonic, `https://alpha.ethereum.matic.network`),
        network_id: "*",
        gas: 8000000,    
        gasPrice: 0,    
        confirmations: 2,    
        timeoutBlocks: 200,  
        skipDryRun: true
      }
    }
}