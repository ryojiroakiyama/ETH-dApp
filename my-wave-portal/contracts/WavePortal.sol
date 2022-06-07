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

    constructor() {
        console.log("Here is my first smart contract!");
    } // 実行後コードがブロックチェーンにデプロイされる

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

}