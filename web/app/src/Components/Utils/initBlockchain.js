// import store from "../redux/store";
import {ethers} from "ethers";

export const BLOCKCHAIN_INITIALIZED = "BLOCKCHAIN_INITIALIZED"; // action type

// action creators (dispatch sends this to redux reducer)

// function blockchainInitialized(data) {
//     return {
//         type: BLOCKCHAIN_INITIALIZED,
//         payload: data
//         };
//     }

//  set up provider, signer and contract instance

const initBlockchain = async () => {

    // get contract instance and user address
    // If you don't specify a //url//, Ethers connects to the default
    // (i.e. ``http:/\/localhost:8545``)

    // I used this to connect to Ganache:

    //const provider = await new ethers.providers.JsonRpcProvider();
    //console.log("provider", provider);

    let provider;
    window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...

    const signer = await provider.getSigner()
    console.log("signer", signer);
    const userAddress = await signer.getAddress();
    console.log("user address", userAddress);

    // initialize shadow contract
    let MV = null;
    const abi = JSON.parse("[\n" +
        "    {\n" +
        "      \"inputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"bytes32[]\",\n" +
        "          \"name\": \"_candidateNames\",\n" +
        "          \"type\": \"bytes32[]\"\n" +
        "        },\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"_endTime\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        },\n" +
        "        {\n" +
        "          \"internalType\": \"uint8\",\n" +
        "          \"name\": \"_buyInValue\",\n" +
        "          \"type\": \"uint8\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"nonpayable\",\n" +
        "      \"type\": \"constructor\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"anonymous\": false,\n" +
        "      \"inputs\": [\n" +
        "        {\n" +
        "          \"indexed\": true,\n" +
        "          \"internalType\": \"address\",\n" +
        "          \"name\": \"previousOwner\",\n" +
        "          \"type\": \"address\"\n" +
        "        },\n" +
        "        {\n" +
        "          \"indexed\": true,\n" +
        "          \"internalType\": \"address\",\n" +
        "          \"name\": \"newOwner\",\n" +
        "          \"type\": \"address\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"name\": \"OwnershipTransferred\",\n" +
        "      \"type\": \"event\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"anonymous\": false,\n" +
        "      \"inputs\": [\n" +
        "        {\n" +
        "          \"indexed\": false,\n" +
        "          \"internalType\": \"address\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"address\"\n" +
        "        },\n" +
        "        {\n" +
        "          \"indexed\": false,\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"name\": \"Received\",\n" +
        "      \"type\": \"event\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"stateMutability\": \"payable\",\n" +
        "      \"type\": \"fallback\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"amount\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"buyIn\",\n" +
        "      \"outputs\": [],\n" +
        "      \"stateMutability\": \"payable\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"calculateWinnings\",\n" +
        "      \"outputs\": [],\n" +
        "      \"stateMutability\": \"nonpayable\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"name\": \"candidateNames\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"bytes32\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"bytes32\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"didVoterWin\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"bool\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"bool\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"endTime\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"getContractBalance\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"getVoteAmount\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"getVoteValue\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint8\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint8\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"getWinnerName\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"bytes32\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"bytes32\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"getWinnerVotes\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"isOwner\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"bool\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"bool\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"owner\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"address\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"address\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"renounceOwnership\",\n" +
        "      \"outputs\": [],\n" +
        "      \"stateMutability\": \"nonpayable\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"timestamp\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"address\",\n" +
        "          \"name\": \"newOwner\",\n" +
        "          \"type\": \"address\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"name\": \"transferOwnership\",\n" +
        "      \"outputs\": [],\n" +
        "      \"stateMutability\": \"nonpayable\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"bytes32\",\n" +
        "          \"name\": \"_candidate\",\n" +
        "          \"type\": \"bytes32\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"name\": \"validCandidate\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"bool\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"bool\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint256\",\n" +
        "          \"name\": \"_candidate\",\n" +
        "          \"type\": \"uint256\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"name\": \"voteForCandidate\",\n" +
        "      \"outputs\": [],\n" +
        "      \"stateMutability\": \"payable\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"voteValue\",\n" +
        "      \"outputs\": [\n" +
        "        {\n" +
        "          \"internalType\": \"uint8\",\n" +
        "          \"name\": \"\",\n" +
        "          \"type\": \"uint8\"\n" +
        "        }\n" +
        "      ],\n" +
        "      \"stateMutability\": \"view\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"inputs\": [],\n" +
        "      \"name\": \"withdrawBalance\",\n" +
        "      \"outputs\": [],\n" +
        "      \"stateMutability\": \"payable\",\n" +
        "      \"type\": \"function\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"stateMutability\": \"payable\",\n" +
        "      \"type\": \"receive\"\n" +
        "    }\n" +
        "  ]");


    MV = new ethers.Contract("0x4ce1FB02C7FaF90Ef36fA24F053f4199fE953230", abi, signer)

    // put state data into the REDUX store for easy access from other pages and components

    let data = {provider, signer, MV, userAddress} // ***** real one ****

    // store.dispatch(blockchainInitialized(data))
    return data; // temp just tp play with the user address
}

export default initBlockchain;