require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "c1754e2153a5417ca85b389cfa0a4e0d";
const RINKEBY_PRIVATE_KEY = "cc644df3bd0ac8315bb50f8ba3506f11d732e19212dd4797952fa1dc2d832adc";

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.4",
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
        }
    }
};
