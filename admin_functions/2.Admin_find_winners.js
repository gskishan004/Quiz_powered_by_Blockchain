var Personal = require('web3-eth-personal');
var personal = new Personal("http://localhost:7545");

Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


web3.eth.personal.newAccount('!@superpassword').then(console.log);
