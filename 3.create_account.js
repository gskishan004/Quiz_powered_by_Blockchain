Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


// create a new account 
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('ws://localhost:7545');


newAcc = web3.eth.accounts.create();
console.log("New account  ->\n", newAcc);
