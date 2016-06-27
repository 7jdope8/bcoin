'use strict';

var bcoin = require('bcoin');
var constants = bcoin.protocol.constants;
var opcodes = constants.opcodes;
var network = bcoin.protocol.network;
var utils = bcoin.utils;
var bn = require('bn.js');

function createGenesisBlock(options) {
  var flags = options.flags;
  var script = options.script;
  var reward = options.reward;
  var tx, block;

  if (!flags) {
    flags = new Buffer(
      'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks',
      'ascii');
  }

  if (!script) {
    script = bcoin.script.fromArray([
      new Buffer('04678afdb0fe5548271967f1a67130b7105cd6a828e039'
        + '09a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c3'
        + '84df7ba0b8d578a4c702b6bf11d5f', 'hex'),
      opcodes.OP_CHECKSIG
    ]);
  }

  if (!reward)
    reward = 50 * constants.COIN;

  tx = new bcoin.tx({
    version: 1,
    flag: 1,
    inputs: [{
      prevout: {
        hash: constants.NULL_HASH,
        index: 0xffffffff
      },
      script: [
        bcoin.opcode.fromNumber(new bn(486604799)),
        bcoin.opcode.fromPush(new Buffer([4])),
        bcoin.opcode.fromData(flags)
      ],
      sequence: 0xffffffff
    }],
    outputs: [{
      value: reward,
      script: script
    }],
    locktime: 0
  });

  block = new bcoin.block({
    version: options.version,
    prevBlock: constants.NULL_HASH,
    merkleRoot: tx.hash('hex'),
    ts: options.ts,
    bits: options.bits,
    nonce: options.nonce,
    height: 0
  });

  block.addTX(tx);

  return block;
}

var main = createGenesisBlock({
  version: 1,
  ts: 1231006505,
  bits: 486604799,
  nonce: 2083236893
});

var testnet = createGenesisBlock({
  version: 1,
  ts: 1296688602,
  bits: 486604799,
  nonce: 414098458
});

var regtest = createGenesisBlock({
  version: 1,
  ts: 1296688602,
  bits: 545259519,
  nonce: 2
});

var segnet3 = createGenesisBlock({
  version: 1,
  ts: 1452831101,
  bits: 486604799,
  nonce: 0
});

var segnet4 = createGenesisBlock({
  version: 1,
  ts: 1452831101,
  bits: 503447551,
  nonce: 0
});

utils.print(main);
utils.print('');
utils.print(testnet);
utils.print('');
utils.print(regtest);
utils.print('');
utils.print(segnet3);
utils.print('');
utils.print(segnet4);
utils.print('');
utils.print('');
utils.print('main hash: %s', main.rhash);
utils.print('main raw: %s', main.toRaw().toString('hex'));
utils.print('');
utils.print('testnet hash: %s', testnet.rhash);
utils.print('testnet raw: %s', testnet.toRaw().toString('hex'));
utils.print('');
utils.print('regtest hash: %s', regtest.rhash);
utils.print('regtest raw: %s', regtest.toRaw().toString('hex'));
utils.print('');
utils.print('segnet3 hash: %s', segnet3.rhash);
utils.print('segnet3 raw: %s', segnet3.toRaw().toString('hex'));
utils.print('');
utils.print('segnet4 hash: %s', segnet4.rhash);
utils.print('segnet4 raw: %s', segnet4.toRaw().toString('hex'));
