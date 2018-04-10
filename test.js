Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));



console.log("Eth accounts ->\n", web3.eth.accounts);


fs = require('fs')
code = fs.readFileSync('Quiz.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Quiz'].interface)
QuizContract = web3.eth.contract(abiDefinition)

contractInstance = QuizContract.at("0x7dc3faf99c6765caac132efdc18d80d7d54cbcf7")

console.log("output of test fn ->\n", contractInstance.test.call({from: web3.eth.accounts[0]}));

