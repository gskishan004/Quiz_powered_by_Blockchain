pragma solidity ^0.4.15;
contract Quiz {
    
    function Quiz(){
        
    }
    
    bytes32[] private question;
    bytes32[] private correct_option; 

	struct answer{
		bytes32[] option;
		uint256   bet_amt;
	}
	
	
	address[] playerList;
	address[] winnerList;

	mapping(address => answer) public answers;
	mapping(address => bool)   public player_ansered ;

	event logAnswer(address bettor);
	
	// ******************************
	// FUNCTIONS FOR PLAYERS
	// ******************************

	function save_player_answer( bytes32 []_option, uint256 _bet_amt) public {
	
	if( !player_ansered [msg.sender]){
	    playerList.push(msg.sender);
	}
	
	uint i;
	for (i=0; i< correct_option.length; i++){
	answers[msg.sender].option[i]  = _option[i];
	}
	
	answers[msg.sender].bet_amt = _bet_amt;
    player_ansered [msg.sender] = true;
    
	emit logAnswer(msg.sender);
	}
    
	
	// ******************************    
    // FUNCTIONS FOR ADMIN
	// ******************************
	
    function set_answers(bytes32[] _correct_option) public {
        correct_option = _correct_option;
    }
    
    function set_questions(bytes32[] _question) public{
        for(uint i =0; i< _question.length; i++){
            question.push(_question[i]);
        }
    }
    
    function get_questions() public returns (bytes32[] question) {
        return question;
    }
    
	function find_winners() public returns (address[] winner){
	    uint i;
	    uint j;
	    for (i=0; i<playerList.length; i++){
	        for (j=0; j<correct_option.length; j++){
    	        if(answers[playerList[i]].option[j] == correct_option[j]){
    	            winnerList.push(playerList[i]);
    	        }
	        }     
	    }
	    return winnerList;
	}
	

}