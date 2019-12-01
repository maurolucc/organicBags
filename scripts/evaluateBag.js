const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/61b0e86bef5e48cc96d9083a3df650d3')

const account1 = '0xb6215F354717aFF104324de7F81045e0A80b3317'

const privateKey1 = Buffer.from('c17f13ed7b913c9d9729f6e72aedbb9966827bb15c5183b92114db4ad6e1ffb8', 'hex')

// Read the deployed contract - get the addresss from Etherscan
const contractAddress = '0x3876E3ae3f9Aa07875aCE3ECb3C2E211Ac4fC0D4'
const abi = [{"constant": false,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"}],"name": "associateBagToOwner","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"},{"internalType": "uint256","name": "_rating","type": "uint256"}],"name": "evaluateBag","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"}],"name": "getBagScores","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"}],"name": "getBagToOwner","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "_shop","type": "address"}],"name": "getCommerceType","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "_shop","type": "address"}],"name": "getOwnerBagsCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "_shop","type": "address"},{"internalType": "uint256","name": "_shopType","type": "uint256"}],"name": "registerShop","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "tokenContract","outputs": [{"internalType": "contract OrganicToken","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}]
const contract = new web3.eth.Contract(abi, contractAddress)

// Transfer some tokens
web3.eth.getTransactionCount(account1, (err, txCount) => {

  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data: contract.methods.evaluateBag('18243FHA','4').encodeABI()
  }
  const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})
  tx.sign(privateKey1)


  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  }).catch(function(err){
    console.log('error:',err)
  });
})



