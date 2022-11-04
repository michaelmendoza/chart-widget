
const { Binary } = require('mongodb');

let UUID = {};

/**
 * Creates a binary UUID from a valid uuid string
 * @param {*} string UUID string
 */
UUID.from = string =>  { 
    const uuid = new Binary(Buffer.from(string.replace(/-/g, '').toLowerCase(), 'hex'), Binary.SUBTYPE_UUID);
    return uuid;
}

/**
 * Converts a binary UUID to a valid uuid string
 * @param {*} buffer binary UUID 
 */
UUID.to = buffer => {
  const binary = new Binary(buffer.read(0, buffer.length()), Binary.SUBTYPE_UUID);

  return [
    binary.buffer.toString('hex', 0, 4),
    binary.buffer.toString('hex', 4, 6),
    binary.buffer.toString('hex', 6, 8),
    binary.buffer.toString('hex', 8, 10),
    binary.buffer.toString('hex', 10, 16),
  ].join('-');
};

module.exports = UUID;