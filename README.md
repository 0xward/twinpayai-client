# @0xward/twinpayai-client

[![NPM Version](https://img.shields.io/npm/v/@0xward/twinpayai-client)](https://www.npmjs.com/package/@0xward/twinpayai-client)
[![NPM Downloads](https://img.shields.io/npm/dm/@0xward/twinpayai-client)](https://www.npmjs.com/package/@0xward/twinpayai-client)
[![License](https://img.shields.io/npm/l/@0xward/twinpayai-client)](https://opensource.org/licenses/MIT)

An automated payment initialization client designed to enable autonomous software entities to programmatically dispatch and audit digital currency transfers on the Stacks layer-2 environment.

---

## Installation

```bash
npm install @0xward/twinpayai-client
```

---

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