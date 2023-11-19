// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import "./ProposalHandler.sol";

contract Dao {
    mapping(address => Member) public members;
    ProposalHandler public proposalHandler;
    uint public platformFeePercentage = 10;
    uint public point_price = 1;

    event Deposit(address indexed member, uint amount);


    struct Member {
        uint deposit;   
        uint points; 
        mapping(uint => bool) hasVoted; 
    }
    constructor(ProposalHandler _proposalHandler) {
        proposalHandler = _proposalHandler;
    }

     function deposit(uint _amount) external payable {
        require(_amount > 0, "Deposit amount must be greater than 0");
        require(msg.value == _amount, "Incorrect deposit amount");
        
        // Update member's deposit and points
        members[msg.sender].deposit += _amount;
        members[msg.sender].points = calculatePoints(members[msg.sender].deposit);

        emit Deposit(msg.sender, _amount);
    }

    function calculatePoints(uint _deposit) internal view returns(uint) {
        return _deposit * point_price;
    }
}
