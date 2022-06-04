// ローカル環境でスマートコントラクトのテストを行うためのプログラム

// async/await, 逐次実行の実現のため
const main = async () => {
	// "WavePortal"コントラクトのコンパイル -> コントラクトに必要なファイルがartifactsディレクトリに生成される
	// getContractFactory: デプロイライブラリのアドレスとWavePortalコントラクトを連携
	// hre: hardhatが用意した全ての機能を含むオブジェクト, hardhat実行毎にHERにアクセスしているのでimport不要
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

	// コントラクトのためだけにEthereumローカルネットワークを作成(スクリプト実行後破棄される)
	// ローカルにマイナーを用意してブロックチェーンの構築
	const waveContract = await waveContractFactory.deploy();

	// コントラクトがローカルブロックチェーン上にデプロイされるまで待つ
	const wavePortal = await waveContract.deployed();
  
	console.log("WavePortal address: ", wavePortal.address);
  };
  
  const runMain = async () => {
	try {
	  await main();
	  process.exit(0);
	} catch (error) {
	  console.log(error);
	  process.exit(1);
	}
  };
  
  runMain();