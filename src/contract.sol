pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


// SPDX-License-Identifier: MIT

contract ToadJims is ERC721URIStorage {
  constructor() ERC721("Toad Jims", "TDJIMs") {}
}
