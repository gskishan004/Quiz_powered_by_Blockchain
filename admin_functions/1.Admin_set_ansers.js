var contractInstance;
var contractAdd = '0x622d88e2ba9a36b57409ac1721b81de761f2bb4d';
var account;

Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

account = web3.eth.accounts[0];

abi = JSON.parse('[ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "player_answered", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_winners", "outputs": [ { "name": "winners", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_option", "type": "int256[]" }, { "name": "_bet_amt", "type": "uint256" } ], "name": "save_player_answer", "outputs": [ { "name": "returnValue", "type": "int256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "find_winners", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "in_winnerList", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_correct_option", "type": "int256[]" } ], "name": "set_answers", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "answers", "outputs": [ { "name": "bet_amt", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_player_answer", "outputs": [ { "name": "sender", "type": "address" }, { "name": "option", "type": "int256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "logTest", "type": "event" } ]')
VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at(contractAdd);

// SET THE ANSWERS
q1 = 2;
q2 = 3;
var arr = new Array(q1,q2);
var events = contractInstance.set_answers(arr, {from: account, gas:6721975});

console.log("Response -> ", events);