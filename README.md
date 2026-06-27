<p align="center">
  <img src="https://raw.githubusercontent.com/0xward/TwinPayAI/main/TwinPayAI_Logo.png" width="96" alt="TwinPay AI logo" />
</p>

# @0xward/twinpayai-client

<p align="center">
  <a href="https://www.npmjs.com/package/@0xward/twinpayai-client"><img src="https://img.shields.io/npm/v/@0xward/twinpayai-client?style=flat-square" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@0xward/twinpayai-client"><img src="https://img.shields.io/npm/dm/@0xward/twinpayai-client?style=flat-square" alt="NPM Downloads" /></a>
  <a href="https://www.npmjs.com/package/@0xward/twinpayai-client"><img src="https://img.shields.io/npm/l/@0xward/twinpayai-client?style=flat-square" alt="License" /></a>
</p>

A lightweight helper client for **[TwinPay AI](https://github.com/0xward/TwinPayAI)** — an AI-powered payments agent built on **Stacks**, the Bitcoin Layer 2 network. This package provides the address/amount validation, fee estimation, and request-shaping logic that TwinPay AI's decision engine uses before a payment is ever signed by the user's wallet.

> **Note:** this client does **not** sign or broadcast transactions itself. It validates inputs, estimates fees, and builds structured request/response objects. Actual signing and broadcasting happen in the host app via `@stacks/connect`, with the user's own wallet (Leather / Xverse).

---

## Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0 (or yarn >= 1.22.0 / pnpm >= 8.0.0)

### Install

```bash
# npm
npm install @0xward/twinpayai-client

# yarn
yarn add @0xward/twinpayai-client

# pnpm
pnpm add @0xward/twinpayai-client
```

### Peer context
This client is network-agnostic on its own — it does not make any HTTP/RPC calls. If you're integrating it into a Stacks app, you'll typically also use:
- `@stacks/connect` (>= 7.x) for wallet connection and transaction signing.
- `@stacks/transactions` / `@stacks/network` (>= 6.x) if you need to construct or broadcast the actual signed transaction.

---

## What this package actually does

* **Input validation** — checks that a recipient is a valid Stacks address (`SP...`) or BNS name (`name.btc` / `name.stx`), and that an amount is a sane positive number within configured min/max bounds.
* **Fee estimation** — `estimateFee()` returns a deterministic fee estimate (in microSTX/STX/USD) for a given USD amount, based on a configurable fee rate. This is what TwinPay AI's decision engine (`groqService.ts`) calls before asking the AI to approve, modify, or reject a payment — so the AI reasons over a real fee number instead of a hardcoded guess.
* **Request/response shaping** — `initiateAiPayment()` and `getTransactionStatus()` return realistic, consistently-shaped objects (txId, status, explorer URL, etc.) for prototyping and testing flows that depend on TwinPay AI's payment lifecycle, without needing a live wallet connection.

### What this package does **not** do
- It does not sign transactions or hold private keys.
- It does not broadcast anything to the Stacks network.
- `initiateAiPayment()` and `getTransactionStatus()` are **simulated** — they generate plausible-looking transaction IDs and statuses for local development/testing, not live on-chain data. For live transaction status, query the Hiro API or Stacks Explorer directly.

---

## Quick Start

```javascript
const { TwinPayClient } = require("@0xward/twinpayai-client");
const client = new TwinPayClient({ network: "mainnet" });

// Estimate the fee for a $50 payment before deciding to send it
const fee = client.estimateFee(50.00);
console.log("Estimated fee:", fee);

// Simulate building a payment request (does not sign/broadcast)
async function previewPayment() {
  const result = await client.initiateAiPayment("0xward.btc", 50.00);
  console.log("Simulated payment request:", result);
}
previewPayment();
```

---

## API Reference

### `new TwinPayClient(config?)`
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `network` | `"mainnet" \| "testnet" \| "devnet"` | `"mainnet"` | Stacks network context. Throws if unsupported. |
| `feeRate` | `number` (microSTX) | `2000` | Base fee rate used by `estimateFee()` and `initiateAiPayment()`. |

### Methods

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `estimateFee` | `amountUsd: number` | `Object` | Returns `{ amountUsd, amountMicroStx, estimatedFeeMicroStx, estimatedFeeStx, estimatedFeeUsd, network }`. |
| `initiateAiPayment` | `recipient: string`, `amountUsd: number` | `Promise<Object>` | Validates inputs and returns a simulated payment request object (txId, status, explorer URL, etc.). |
| `getTransactionStatus` | `txId: string` | `Promise<Object>` | Returns a simulated status object for a given txId (deterministic based on the txId, not a live chain query). |
| `getSupportedNetworks` | — | `Array<Object>` | Lists configured networks (`mainnet`, `testnet`, `devnet`) with their chain ID, API URL, and currency. |
| `getVersion` | — | `string` | Returns the client's internal version string. |

---

## Used by

This client is the validation/fee-estimation layer behind [**TwinPay AI**](https://github.com/0xward/TwinPayAI), an agentic payments app on Stacks. See the main repo for the full product: AI decision engine, on-chain spending vault, multisig vault, and more.

---

## License

This project is licensed under the terms of the MIT License.
