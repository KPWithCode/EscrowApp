pragma solidity ^0.5.2;

contract Escrow {
    address public payer;
    address payable public payee ;
    address public lawyer;
    uint public amount;

    constructor(address _payer, address payable _payee, uint _amount) public {
        payer = _payer;
        payee = _payee;
        lawyer = msg.sender;
        amount = _amount;
    }
    function deposit() public payable {
        // The send has to be able to send money
        require(msg.sender == payer, "Sender must be the payer");
        require(address(this).balance <= amount, "Cant send more than escrow amount");
    }
    function release() public {
        //  All funds need to be received before it can be released
        require(address(this).balance == amount, "cannot release money before the full amount was sent");
        require(msg.sender == lawyer, "Only lawyer can release funds");
        payee.transfer(amount);
    }
    function balanceOf() public view returns(uint) {
        return address(this).balance;
    }
}