//---------------------------------------------------------------------
//Contract details
//---------------------------------------------------------------------

var contractInstance;
var contractAdd = '0x622d88e2ba9a36b57409ac1721b81de761f2bb4d';
var web3;
var account;

//Initialize contract instance
function initializeContractInstance(){
    abi = JSON.parse('[ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "player_answered", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_winners", "outputs": [ { "name": "winners", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_option", "type": "int256[]" }, { "name": "_bet_amt", "type": "uint256" } ], "name": "save_player_answer", "outputs": [ { "name": "returnValue", "type": "int256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "find_winners", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "in_winnerList", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_correct_option", "type": "int256[]" } ], "name": "set_answers", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "answers", "outputs": [ { "name": "bet_amt", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_player_answer", "outputs": [ { "name": "sender", "type": "address" }, { "name": "option", "type": "int256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "logTest", "type": "event" } ]')
    VotingContract = web3.eth.contract(abi);
    contractInstance = VotingContract.at(contractAdd);
}


//validate data
function validateData(add,q1,q2){
    if (add.length ==0 || q1 ==0 || q2 ==0){
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
    
   
    document.getElementById("contractAddress").innerHTML = "Contract @ "+ contractAdd;
    document.getElementById("userAddress").value = account;


    initializeContractInstance();
        
  });


    


}

// Wire up the UI elements

    $("#submitButton").click(function() {
        var address = $("#userAddress").val();
       
        var q1       = document.getElementById("q1").selectedIndex;
        var q2       = document.getElementById("q2").selectedIndex;

        console.log("q1 and q2", q1,q2);

        var validateResult = validateData(address,q1,q2);


        if (validateResult == 1 ){
            var arr = new Array(q1,q2);
            var events = contractInstance.save_player_answer(arr, 0, {from: account, gas:6721975});

            console.log("Response after saving player anwser -> ", events);

            var events = contractInstance.get_player_answer({from: account, gas:6721975});

            console.log("Player Address                      -> ", events[0]);

            console.log("Player Answers                      -> ", events[1]);
            
        }


       
    });
