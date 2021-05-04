// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Ownable.sol";

contract SetupVoting is Ownable {

    uint8 public voteValue;
    uint public endTime;
    uint public timestamp;

    function setVoteValue(uint8 _value) internal onlyOwner {
        voteValue = _value;
    }

    function setEndTime(uint _endTime) internal onlyOwner {
        //get current block time and add the end time
        timestamp = block.timestamp;
        endTime = timestamp + _endTime;
    }

    function getVoteValue() public view returns (uint8) {
        return voteValue;
    }

}