// ローカル環境でスマートコントラクトのテストを行うためのプログラム

const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // 0.1ETHをコントラクトに提供してデプロイする
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);

  // コントラクトのアドレスに紐付いている残高を取得
  // 結果を出力（0.1ETHであることを確認）
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    // wei単位の残高をETH単位に変換
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Waveし、トランザクションが完了するまで待機
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  // Waveした後のコントラクトの残高を取得し、結果を出力（0.0001ETH引かれていることを確認）
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

/* wave(void)の時のテストコードメモ
// async/await, 逐次実行の実現のため
const main = async () => {
  // getSigners(): Hardhatが任意のアドレスを返す
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // "WavePortal"コントラクトのコンパイル -> コントラクトに必要なファイルがartifactsディレクトリに生成される
  // getContractFactory: デプロイライブラリのアドレスとWavePortalコントラクトを連携
  // hre: hardhatが用意した全ての機能を含むオブジェクト, hardhat実行毎にHERにアクセスしているのでimport不要
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // コントラクトのためだけにEthereumローカルネットワークを作成(スクリプト実行後破棄される)
  // ローカルにマイナーを用意してブロックチェーンの構築
  const waveContract = await waveContractFactory.deploy();

  // コントラクトがローカルブロックチェーン上にデプロイされるまで待つ
  const wavePortal = await waveContract.deployed();

  // wavePortal.address: デプロイ先のアドレス
  console.log("Contract deployed to:", wavePortal.address);
  // owner.address: デプロイした人のアドレス
  console.log("Contract deployed by:", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  // wave()は書き込み処理があるのでガス代がかかる->ユーザは取引の確認が必要
  // ->ユーザが新しいwaveを送ったことを承認するまでフロントエンド待機
  let waveTxn = await waveContract.wave();
  // トランザクション結果の取得
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  // 他ユーザがwaveを送った状態をシュミレート
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
};
*/

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
