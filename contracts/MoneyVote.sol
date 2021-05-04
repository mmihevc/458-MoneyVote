// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "./SetupVoting.sol";

contract MoneyVote is SetupVoting{

    struct Voter {
        bool voted;
        bool withdrawn;
        bytes32 votedFor;
    }

    struct Candidate {
        bytes32 name;
        uint totalVotes;
    }

    uint private totalVotes;

    uint winner;

    uint public amount;

    mapping (address => Voter) private voters;

    Candidate[] private candidateList;

    bytes32[] public candidateNames;

    /* This is the constructor which will be called once when you
    deploy the contract to the blockchain. When we deploy the contract,
    we will pass an array of candidates who will be contesting in the election
    along with the end time and the buy in amount
    */
    constructor(bytes32[] memory _candidateNames, uint _endTime, uint8 _buyInValue) {
        //console.log("in Voting Dapp constructor");
        candidateNames = _candidateNames;
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidateList.push(Candidate({
                name: _candidateNames[i],
                totalVotes: 0
            }));
        }
        super.setVoteValue(_buyInValue);
        super.setEndTime(_endTime);
    }

    function getWinnerName() public view returns(bytes32){
        require(block.timestamp > endTime, "Voting still in progress.");
        return candidateList[winner].name;
    }

    function getWinnerVotes() public view returns(uint){
        require(block.timestamp > endTime, "Voting still in progress.");
        return candidateList[winner].totalVotes;
    }

    function getVoteAmount() public view returns(uint) {
        return totalVotes;
    }

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function findWinner() private {
        //require(block.timestamp > endTime, "Voting still in progress.");
        uint _maxVotes = 0;
        uint _winner;
        for (uint i = 0; i < candidateList.length; i++) {
            uint _currentVotes = candidateList[i].totalVotes;
            if (_currentVotes > _maxVotes) {
                _maxVotes = _currentVotes;
                _winner = i;
            }
        }

        winner =  _winner;
    }

    function didVoterWin() public view returns(bool){
        require(block.timestamp <= endTime, "Voting ended.");
        if (voters[msg.sender].votedFor == candidateList[winner].name) {
            return true;
        }
        return false;
    }

    // Allows user to vote for a candidate and also buy in.
    function voteForCandidate(uint _candidate) public payable{
        require(block.timestamp <= endTime, "Voting ended.");
        require(validCandidate(candidateList[_candidate].name), "Candidate not valid.");
        require(voters[msg.sender].voted == false, "User already voted.");
        buyIn();
        candidateList[_candidate].totalVotes += 1;
        voters[msg.sender] = Voter({
            voted: true,
            withdrawn: false,
            votedFor: candidateList[_candidate].name
        });
        findWinner();
        totalVotes++;
    }

    // Makes sure the candidte actually exists in the list.
    function validCandidate(bytes32 _candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i].name == _candidate) {
                return true;
            }
        }
        return false;
    }

    // Has the user buy into the pool based on the set value.
    function buyIn() public payable {
        require(msg.value == super.getVoteValue(), "Cannot buy in.");
        
    }

    // Allow user to withdraw winnings if they won.
    function withdrawBalance() public payable {
        require(block.timestamp > endTime, "Voting still in progress.");
        require(voters[msg.sender].withdrawn == false, "User already withdrew.");
        require(voters[msg.sender].votedFor == getWinnerName(), "User did not vote for winner.");
        voters[msg.sender].withdrawn = true;
        payable(msg.sender).transfer(amount);
    }

    // Find out how much the current user should be paid.
    function calculateWinnings() public {
        require(block.timestamp > endTime, "Voting still in progress.");
        uint _votes = getWinnerVotes();
        uint _contractBal = address(this).balance;
        amount = _contractBal/_votes;
    }

    event Received(address, uint);

    receive () external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback () external payable {

    }
}
