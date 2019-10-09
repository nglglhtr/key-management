import Portis from '@portis/web3';
import Web3 from 'web3';
const maticTest = {
  nodeUrl: 'http://testnet2.matic.network',
  chainId: 8995,
};
const portis = new Portis('15f0ec32-f562-45d6-b3bd-1880c2fd5b74', 'kovan');
const getWeb3 = new Web3(portis.provider);

// export default web3;

// import Web3 from 'web3';

// const getWeb3 = () => new Promise((resolve) => {
//   window.addEventListener('load', () => {
//     let currentWeb3;

//     if (window.ethereum) {
//       currentWeb3 = new Web3(window.ethereum);
//       try {
//         // Request account access if needed
//         window.ethereum.enable();
//         // Acccounts now exposed
//         resolve(currentWeb3);
//       } catch (error) {
//         // User denied account access...
//         alert('Please allow access for the app to work');
//       }
//     } else if (window.web3) {
//       window.web3 = new Web3(web3.currentProvider);
//       // Acccounts always exposed
//       resolve(currentWeb3);
//     } else {
//       console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//     }
//   });
// });

export default getWeb3;