require('magic-globals');
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/61b0e86bef5e48cc96d9083a3df650d3')

var fs = require('fs');

module.exports = {
    registerShop: registerShop,
    associateBagToOwner: associateBagToOwner,
    evaluateBag: evaluateBag,
    getCommerceType: getCommerceType,
    getBagToOwner: getBagToOwner,
    getBagScores: getBagScores,
    getTokens: getTokens,
}

// ORGANICBAGS SMART CONTRACT
const organicBagsContract = '0xFDB3987Fe00D9A3Dff69321B61fF7ccd4F66944A'
const obAbi = [{"constant": false,"inputs": [{"internalType": "address","name": "_contract","type": "address"}],"name": "addToken","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"}],"name": "associateBagToOwner","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"},{"internalType": "uint256","name": "_rating","type": "uint256"}],"name": "evaluateBag","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"}],"name": "getBagScores","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "string","name": "_qrCode","type": "string"}],"name": "getBagToOwner","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "_shop","type": "address"}],"name": "getCommerceType","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "_shop","type": "address"}],"name": "getOwnerBagsCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "_shop","type": "address"}],"name": "getTokens","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "_shop","type": "address"},{"internalType": "uint256","name": "_shopType","type": "uint256"}],"name": "registerShop","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "tokenContract","outputs": [{"internalType": "contract OrganicToken","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}]
const obContract = new web3.eth.Contract(obAbi, organicBagsContract)

// ORGANICTOKENS SMART CONTRACT
const organicTokensContract = '0x3d8C29D592994E4964fde5303F7b72E06DDE7619'
const otAbi = [{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_owner","type": "address"},{"indexed": true,"internalType": "address","name": "_spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "_value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_from","type": "address"},{"indexed": true,"internalType": "address","name": "_to","type": "address"},{"indexed": false,"internalType": "uint256","name": "_value","type": "uint256"}],"name": "Transfer","type": "event"},{"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "_spender","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "_shop","type": "address"}],"name": "getBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "standard","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"}]
const otContract = new web3.eth.Contract(otAbi, organicBagsContract)


// INTERACT INFORMATION TO THE LEDGER
function registerShop(account, privateKey, address, shopType){
    let pk = Buffer.from(privateKey, 'hex') 
    sendTxToEthereum(account, pk, organicBagsContract, obContract.methods.registerShop(address, shopType).encodeABI());
} 

function associateBagToOwner(account, privateKey, qrCode){
    let pk = Buffer.from(privateKey, 'hex') 
    sendTxToEthereum(account, pk, organicBagsContract, obContract.methods.associateBagToOwner(qrCode).encodeABI());
}

function evaluateBag(account, privateKey, qrCode, grade){
    let pk = Buffer.from(privateKey, 'hex')   
    sendTxToEthereum(account, pk, organicBagsContract, obContract.methods.evaluateBag(qrcode, grade).encodeABI());
}

function getCommerceType(account, privateKey, shopAddress){
    let pk = Buffer.from(privateKey, 'hex')  
    obContract.methods.getCommerceType(shopAddress).encodeABI()
    sendTxToEthereum(account, pk, organicBagsContract, obContract.methods.getCommerceType(shopAddress).encodeABI());
}

function getBagToOwner(account, privateKey, qrCode){
    let pk = Buffer.from(privateKey, 'hex') 
    obContract.methods.getBagToOwner(qrCode).encodeABI()
    sendTxToEthereum(account, pk, organicBagsContract, obContract.methods.getBagToOwner(qrCode).encodeABI());
}

function getBagScores(account, privateKey, qrCode){
    let pk = Buffer.from(privateKey, 'hex')  
    obContract.methods.getBagScores(qrCode).encodeABI()
    sendTxToEthereum(account, pk, organicBagsContract, obContract.methods.getBagScores(qrCode).encodeABI());
}

function getTokens(account, privateKey, shopAddress){
    let pk = Buffer.from(privateKey, 'hex') 
    sendTxToEthereum(account, pk, organicTokensContract, otContract.methods.getTokens(shopAddress).encodeABI());
}

// Sign and send transaction
function sendTxToEthereum(account, privateKey, contractAddress ,funcData){
    web3.eth.getTransactionCount(account, (err, txCount) => {
        const txObject = {
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(250000), 
          gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'Gwei')),
          to: contractAddress,
          data: funcData
        }
        
        const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})
        tx.sign(privateKey)
      
        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')
        
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          console.log('err:', err, 'txHash:', txHash);
        })
      })
}

// INTERACT WITH ORACLE (COUCHDB)
/*function storeAccountDetails(accountDetails){
    return new Promise((resolve,reject)=>{
        const axios = require('axios');
        console.log("axios requests couchdb to store information")
       
    });
}

function retrieveAccountDetails(accountAddress){
    return new Promise((resolve,reject)=>{
        const axios = require('axios');
        console.log("axios requests couchdb to retrieve information for account:", accountAddress);
        
    });
}*/

/*function registerShop(address){
    return new Promise((resolve,reject)=>{
        console.log("registerShop")
    });
} */