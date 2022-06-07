// smart contractとフロントエンドを結びつける役割をする
// run.jsに比べて本番環境

const main = async () => {
	const [deployer] = await hre.ethers.getSigners();
	const accountBalance = await deployer.getBalance();
	const waveContract = await hre.ethers.getContractFactory("WavePortal");
	const wavePortal = await waveContract.deploy();
  
	// hardhat.config.jsを編集(metamaskの秘密鍵載せた)して, Rinkbyネットワークで実行したら
	// アドレスはmetamaskのアカウントアドレスになってた
	console.log("Deploying contracts with account: ", deployer.address);
	console.log("Account balance: ", accountBalance.toString());
	console.log("Contract deployed to: ", wavePortal.address);
	console.log("Contract deployed by: ", deployer.address);
  };
  
  const runMain = async () => {
	try {
	  await main();
	  process.exit(0);
	} catch (error) {
	  console.error(error);
	  process.exit(1);
	}
  };
  
  runMain();