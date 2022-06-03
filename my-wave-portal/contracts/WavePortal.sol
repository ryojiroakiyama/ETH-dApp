// SPDX-License-Identifier: UNLICENSED

// コントラクトの作成

// コントラクトで使うsolidityコンパイラのバージョン指定
pragma solidity ^0.8.4;

// コントラクト実行時にコンソールログをターミナルに出力するためのファイル
import "hardhat/console.sol";

// contract: like a class
contract WavePortal {
    constructor() {
        console.log("Here is my first smart contract!");
    } // 実行後コードがブロックチェーンにデプロイされる
}