//---------------------------------------------------------------------
//Contract details
//---------------------------------------------------------------------

var contractInstance;
var contractAdd = '0x141b27fcb81398649c3172d7af55c7e8b2025c81';



// Initialize
function initialize(address) {
    
    fs              = require("fs"),
    code            = fs.readFileSync('Quiz.sol').toString()
    solc            = require('solc')
    compiledCode    = solc.compile(code)


    abiDefinition = JSON.parse(compiledCode.contracts[':Quiz'].interface)
    VotingContract = web3.eth.contract(abiDefinition)
    byteCode = compiledCode.contracts[':Quiz'].bytecode
    deployedContract = QuizContract.new({from: address, gas: 4700000})
    deployedContract.address
    contractInstance = QuizContract.at(deployedContract.address)
    console.log(code , contractInstance.address);

}



//validate data
function validateData(add,q1,q2){
    if (add.length ==0 || q1.length ==0 || q2.length ==0){
        alert("Please validate all the input fields");
        return 0;
    }
    return 1;
}

window.onload = function() {


    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

    web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    
    // get real value here !!!!!!!!!!
    account = accounts[0];
    
   
    document.getElementById("contractAddress").value = contractAdd;
    document.getElementById("userAddress").value = account;

    
    abi = JSON.parse('[ { "constant": false, "inputs": [], "name": "get_questions", "outputs": [ { "name": "question", "type": "bytes32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_question", "type": "bytes32[]" } ], "name": "set_questions", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "find_winners", "outputs": [ { "name": "winner", "type": "address[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_option", "type": "bytes32[]" }, { "name": "_bet_amt", "type": "uint256" } ], "name": "save_player_answer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "answers", "outputs": [ { "name": "bet_amt", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_correct_option", "type": "bytes32[]" } ], "name": "set_answers", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "player_ansered", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "test", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bettor", "type": "address" } ], "name": "logAnswer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "logTest", "type": "event" } ]')
    VotingContract = web3.eth.contract(abi);
    contractInstance = VotingContract.at(contractAdd);
    contractInstance.test.call({from: web3.eth.accounts[0]})

    
  });


    


}

// Wire up the UI elements

    $("#submitButton").click(function() {
        var address = $("#userAddress").val();
        var q1      = $("#q1").val();
        var q2      = $("#q2").val();

        var validateResult = validateData(address,q1,q2);
        //console.log(address,q1,q2,validateResult);

        initialize(address);

        if (validateResult == 1 ){
            var arr = new Array(q1,q2);
            contractInstance.set_ansers(arr);
        }
       
    });
