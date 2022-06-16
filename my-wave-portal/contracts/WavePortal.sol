// SPDX-License-Identifier: UNLICENSED

// コントラクトの作成

// コントラクトで使うsolidityコンパイラのバージョン指定
pragma solidity ^0.8.4;

// コントラクト実行時にコンソールログをターミナルに出力するためのファイル
import "hardhat/console.sol";

// contract: like a class
contract WavePortal {
    // 状態変数, WavePortalコントラクトのストレージに永続的保存
    uint256 totalWaves;
    event NewWave(address indexed from, uint256 timestamp, string message);
    struct Wave {
        address waver; //「👋（wave）」を送ったユーザーのアドレス
        string message; // ユーザーが送ったメッセージ
        uint256 timestamp; // ユーザーが「👋（wave）」を送った瞬間のタイムスタンプ
    }
    // 構造体の配列を格納するための変数wavesを宣言。
    // これで、ユーザーが送ってきたすべての「👋（wave）」を保持することができます。
    Wave[] waves;

    // payable: 送金を許可する
    constructor() payable {
        console.log("We have been constructed!");
    }

    // _messageという文字列を要求するようにwave関数を更新。
    // _messageは、ユーザーがフロントエンドから送信するメッセージです。
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        // 「👋（wave）」とメッセージを配列に格納。
        waves.push(Wave(msg.sender, _message, block.timestamp));
        // コントラクト側でemitされたイベントに関する通知をフロントエンドで取得できるようにする。
        emit NewWave(msg.sender, block.timestamp, _message);
        // 「👋（wave）」を送ってくれたユーザーに0.0001ETHを送る
        uint256 prizeAmount = 0.0001 ether;
        // require: if文, 第一引数がfalse -> トランザクションキャンセル(第二引数にエラー内容)
        require(
            //  address(this).balance: コントラクトが持つ残高
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        // ユーザに送金を行う
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        // トランザクションの成功の確認
        // 成功: 送金
        // 失敗: エラー文出力
        require(success, "Failed to withdraw money from contract.");
    }

    // 構造体配列のwavesを返してくれるgetAllWavesという関数を追加。
    // これで、私たちのWEBアプリからwavesを取得することができます。
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        // コントラクトが出力する値をコンソールログで表示する。
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
