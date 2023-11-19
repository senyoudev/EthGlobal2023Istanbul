// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import "./ProposalHandler.sol";

contract Dao {
    mapping(address => Member) public members;
    ProposalHandler public proposalHandler;
    uint public platformFeePercentage = 10;
    uint public point_price = 2;
    uint public point_price_sell = 1;

    mapping(uint => mapping(address => uint)) public winnerPoints; 

    event Deposit(address indexed member, uint amount);
    event withdraw(address indexed member, uint amount);


    struct Member {
        uint deposit;   
        uint points; 
        uint HowMuchShouldWin;
        mapping(uint => bool) hasWin; 
    }
    constructor(ProposalHandler _proposalHandler) {
        proposalHandler = _proposalHandler;
    }

     function deposit(uint _amount) external payable {
        require(_amount > 0, "Deposit amount must be greater than 0");
        require(msg.value == _amount, "Incorrect deposit amount");
        
        members[msg.sender].deposit += _amount;
        members[msg.sender].points = calculatePoints(members[msg.sender].deposit);
        uint winnerReward = members[msg.sender].points * point_price_sell;
        members[msg.sender].HowMuchShouldWin += winnerReward;

        emit Deposit(msg.sender, _amount);
    }

    function calculatePoints(uint _deposit) internal view returns(uint) {
        return _deposit * point_price;
    }

     function distributeRewards(uint _proposalId) internal {
        //should be implemented in proposal handler
        uint totalReward = proposalHandler.getDonationAmount(_proposalId);
        uint platformFee = totalReward * platformFeePercentage / 100;


        uint[] memory winners = proposalHandler.getWinners(_proposalId);
        uint allWinnersPoints;

        for(uint i = 0; i < winners.length; i++) {
            allWinnersPoints += winnerPoints[_proposalId][winners[i]];   
        }
        if(allWinnersPoints == 0) {
             allWinnersPoints = 1;
         }
        for (uint i = 0; i < winners.length; i++) {
            uint winnerReward = (totalReward * winnerPoints[_proposalId][winners[i]]) / allWinnersPoints;
            members[winners[i]].HowMuchShouldWin += winnerReward;
        }
    }

    function withdrawFunds() external {
        uint amount = members[msg.sender].HowMuchShouldWin;
        members[msg.sender].HowMuchShouldWin = 0;
        payable(msg.sender).transfer(amount);
    }

}
