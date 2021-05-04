async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    let candidates = [ethers.utils.formatBytes32String('Arlo'), ethers.utils.formatBytes32String('Maizee'), ethers.utils.formatBytes32String('Tim'), ethers.utils.formatBytes32String('Razmataz')];

    const moneyVoteFactory = await ethers.getContractFactory("MoneyVote");
    const moneyVote = await moneyVoteFactory.deploy(candidates, 300, 1);
    const setupVotingFactory = await ethers.getContractFactory("SetupVoting");
    const setupVoting = await setupVotingFactory.deploy();
    const ownableFactory = await ethers.getContractFactory("Ownable");
    const ownable = await ownableFactory.deploy();

    console.log("MoneyVote contract address:", moneyVote.address);
    console.log("SetupVoting contract address:", setupVoting.address);
    console.log("Ownable contract address:", ownable.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });