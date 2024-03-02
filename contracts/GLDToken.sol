// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ERC20.sol";

contract GLDToken is ERC20 {
    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 10000000 * 10 ** uint(decimals()));
    }
}