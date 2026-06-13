<p align="center">
  <img src="https://raw.githubusercontent.com/SamAnand/SVG-Animations/master/grid.svg" alt="0xward Core Intelligence Sync Animation" width="120" height="120" />
</p>

# @0xward/twinpayai-client

<p align="center">
  <a href="https://www.npmjs.com/package/@0xward/twinpayai-client"><img src="https://img.shields.io/npm/v/@0xward/twinpayai-client?style=flat-square" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@0xward/twinpayai-client"><img src="https://img.shields.io/npm/dm/@0xward/twinpayai-client?style=flat-square" alt="NPM Downloads" /></a>
  <a href="https://www.npmjs.com/package/@0xward/twinpayai-client"><img src="https://img.shields.io/npm/l/@0xward/twinpayai-client?style=flat-square" alt="License" /></a>
</p>

TwinPay AI Automated Payment Client—core computational logic for decentralized intelligence frameworks built on STACKS ecosystems.


## Core Capabilities

* **Autonomous Fee Profiling:** Computes native transaction fee limits to maximize inclusion speed on the underlying Bitcoin miners network.
* **Cryptographic Payload Signing:** Signs payment objects via client-side keys conforming to institutional message structures.
* **Settlement State Telemetry:** Streams transactional progression metrics from immediate memory pool status to final Bitcoin anchoring.

---

## Quick Start

```javascript
const { TwinPayClient } = require("@0xward/twinpayai-client");
const client = new TwinPayClient();

async function processPayment() {
    const result = await client.initiateAiPayment("0xward.btc", 50.00);
    console.log("Transaction Receipt Parameters:", result);
}

processPayment();
```

---

## API Reference

### Methods

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `initiateAiPayment` | `recipient: string`, `amountUsd: number` | `Promise<Object>` | Builds and passes a signed financial request payload to the active network nodes. |
| `getTransactionStatus` | `txHash: string` | `Promise<Object>` | Pulls ledger block numbers to return absolute confirmation state details. |

---

## License

This project is licensed under the terms of the MIT License.