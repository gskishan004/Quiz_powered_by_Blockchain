var contractInstance;

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

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    
    var erc20Abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"}];


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
    account = accounts[0];
    
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
