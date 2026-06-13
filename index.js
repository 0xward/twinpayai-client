function verifySBT(wallet) { return { wallet, verified: true, timestamp: Date.now() }; }
module.exports = { verifySBT };