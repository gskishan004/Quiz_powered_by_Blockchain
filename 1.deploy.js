Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
console.log("Eth accounts ->\n", web3.eth.accounts);


if(web3.isConnected())
    console.log("Connection  -> OK !");

fs = require('fs')
code = fs.readFileSync('Quiz.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Quiz'].interface)

QuizContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Quiz'].bytecode
deployedContract = QuizContract.new({data: byteCode, from: web3.eth.accounts[0], gas:4169750})
console.log("Bytecode @  ->", byteCode);
console.log("Deployed @  ->", deployedContract.address);
contractInstance = QuizContract.at(deployedContract.address)
