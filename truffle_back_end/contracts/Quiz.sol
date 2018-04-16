pragma solidity ^0.4.15;
contract Quiz {
    
	address owner;

    function Quiz() public payable	{
    	owner = msg.sender;  
    }
    
    int[] private correct_option; 

	struct answer{
		int[] option;
		uint256   bet_amt;
	}
	
	
	address[] playerList;
	address[] winnerList;

	mapping(address => answer) public answers;
	mapping(address => bool)   public player_answered ;
	mapping(address => bool)   public in_winnerList ;

	event logTest(address sender);

	
	// ******************************
	// FUNCTIONS FOR PLAYERS
	// ******************************

	function save_player_answer( int []_option, uint256 _bet_amt) public returns (int returnValue) {
	
	if( !player_answered [msg.sender]){
	    playerList.push(msg.sender);
	    
    	for (uint i=0; i< _option.length; i++){
    	answers[msg.sender].option.push(_option[i]);
    	}
    	
    	answers[msg.sender].bet_amt = _bet_amt;
        player_answered [msg.sender] = true;
        return 1;
    	}
    return 0;
	}
	
    function get_player_answer() public constant returns (address sender,int[] option){
        return (msg.sender, answers[msg.sender].option);
    }
    
	
	// ******************************    
    // FUNCTIONS FOR ADMIN
	// ******************************
	
    function set_answers(int[] _correct_option) public  {
        for (uint i=0; i< _correct_option.length; i++){
    	correct_option.push(_correct_option[i]);
    	}
    }
    
    
	function find_winners() public {
	    uint i;
	    uint j;
	    uint number_of_correct_ans;
	    for (i=0; i<playerList.length; i++){
	        number_of_correct_ans = 0;
	        for (j=0; j<correct_option.length; j++){
    	        if(answers[playerList[i]].option[j] == correct_option[j]){
    	            number_of_correct_ans+=1;
    	        }
    	    }
    	    if (number_of_correct_ans == correct_option.length){
    	        if( !in_winnerList [playerList[i]]){
    	        winnerList.push(playerList[i]);
    	        }
    	    }
	    }
	}
	
     function get_winners() public constant returns (address [] winners){
        return (winnerList);
    }

}