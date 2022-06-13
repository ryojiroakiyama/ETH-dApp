// ローカル環境でスマートコントラクトのテストを行うためのプログラム

const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  console.log("Contract added to:", waveContract.address);
  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());
  /**
   * 「👋（wave）」を送る
   */
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait(); // トランザクションが承認されるのを待つ（テスト:1回目）
  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait(); // トランザクションが承認されるのを待つ（テスト:2回目）
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
