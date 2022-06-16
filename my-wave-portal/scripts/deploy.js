// smart contractとフロントエンドを結びつける役割をする
// run.jsはローカル環境にデプロイする用
// deploy.jsは本番環境にデプロイする用

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  // hardhat.config.jsを編集(metamaskの秘密鍵載せた)して, Rinkbyネットワークで実行したら
  // アドレスはmetamaskのアカウントアドレスになってた
  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  /* コントラクトに資金提供してデプロイ */
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });

  // 資金を追加するまでデプロイを待機
  await waveContract.deployed();

  console.log("WavePortal address: ", waveContract.address);
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
