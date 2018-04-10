pragma solidity ^0.4.15;
contract Quiz {
    
	address owner;

    function Quiz() payable	{
    	owner = msg.sender;  
    }
    

	function test() public returns (address send){
		return msg.sender;
	}




}