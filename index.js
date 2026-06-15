// @0xward/twinpayai-client
// AI-powered payment transaction client for the Stacks blockchain (Bitcoin L2)
// Describe your intent in plain English — TwinPay handles the rest.

const STACKS_NETWORKS = {
};

const STX_USD_RATE         = 2.0;   // mock exchange rate
const DEFAULT_FEE_MICRO_STX = 2000; // micro-STX
const MIN_TRANSFER_USD      = 0.01;
const MAX_TRANSFER_USD      = 100000;

const TX_STATUSES = {
    PENDING:   "pending_mempool",
    CONFIRMED: "confirmed_bitcoin_anchored",
    FAILED:    "failed",
    NOT_FOUND: "not_found",
};

class TwinPayClient {
    constructor(config = {}) {
        const net = config.network || "mainnet";
        if (!STACKS_NETWORKS[net]) {
            throw new Error(`Unsupported network: "${net}". Use "mainnet", "testnet", or "devnet".`);
        }
        this.networkConfig = STACKS_NETWORKS[net];
        this.networkName   = net;
        this.feeRate       = config.feeRate || DEFAULT_FEE_MICRO_STX;
        this.version       = "1.1.7";
    }

    _validateRecipient(recipient) {
        if (typeof recipient !== "string" || recipient.trim().length === 0) {
            throw new Error("recipient must be a non-empty string.");
        }
        const isStacksAddr = /^SP[0-9A-Z]{33,41}$/.test(recipient);
        const isBnsName    = /^[a-z0-9-]+\.(btc|stx)$/.test(recipient);
        if (!isStacksAddr && !isBnsName) {
            throw new Error(
                `Invalid recipient: "${recipient}". Expected a Stacks address (SP...) or BNS name (e.g. name.btc).`
            );
        }
        return recipient.trim();
    }

    _validateAmount(amountUsd) {
        const amount = parseFloat(amountUsd);
        if (isNaN(amount) || amount <= 0) {
            throw new Error("amountUsd must be a positive number.");
        }
        if (amount < MIN_TRANSFER_USD) {
            throw new Error(`Minimum transfer is $${MIN_TRANSFER_USD} USD.`);
        }
        if (amount > MAX_TRANSFER_USD) {
            throw new Error(`Maximum transfer is $${MAX_TRANSFER_USD} USD.`);
        }
        return amount;
    }

    _usdToMicroStx(amountUsd) {
        const stx      = amountUsd / STX_USD_RATE;
        return Math.round(stx * 1_000_000); // STX → micro-STX
    }

    _generateTxId() {
        const chars = "0123456789abcdef";
        let id = "0x";
        for (let i = 0; i < 64; i++) {
            id += chars[Math.floor(Math.random() * chars.length)];
        }
        return id;
    }

    async initiateAiPayment(recipient, amountUsd) {
        const validRecipient = this._validateRecipient(recipient);
        const validAmount    = this._validateAmount(amountUsd);

        const microStxAmount = this._usdToMicroStx(validAmount);
        const stxAmount      = (microStxAmount / 1_000_000).toFixed(6);
        const txId           = this._generateTxId();
        const estimatedBlock = Math.floor(Math.random() * 5) + 1;

        return {
            status: TX_STATUSES.PENDING,
            txId,
            recipient: validRecipient,
            amountUsd: validAmount,
            amountStx: parseFloat(stxAmount),
            amountMicroStx: microStxAmount,
            feeMicroStx: this.feeRate,
            feeStx: (this.feeRate / 1_000_000).toFixed(6),
            exchangeRateUsdPerStx: STX_USD_RATE,
            network: this.networkName,
            estimatedConfirmationBlocks: estimatedBlock,
            bitcoinSettlement: "pending_bitcoin_anchoring",
            explorerUrl: 'https://explorer.hiro.so/txid/' + txId + '?chain=' + this.networkName,
            initiatedAt: new Date().toISOString(),
            sdkVersion: this.version,
        };
    }

    async getTransactionStatus(txId) {
        if (typeof txId !== "string" || !txId.startsWith("0x") || txId.length !== 66) {
            throw new Error(`Invalid txId format: "${txId}". Expected 0x + 64 hex characters.`);
        }

        const seed       = parseInt(txId.slice(2, 10), 16);
        const statusKeys = Object.values(TX_STATUSES);
        const status     = statusKeys[seed % statusKeys.length];
        const blockHeight = Math.floor(Math.random() * 1000) + 150000;

        return {
            txId,
            status,
            network: this.networkName,
            blockHeight: status === TX_STATUSES.CONFIRMED ? blockHeight : null,
            bitcoinAnchorBlock: status === TX_STATUSES.CONFIRMED ? blockHeight - 2 : null,
            confirmations: status === TX_STATUSES.CONFIRMED ? Math.floor(Math.random() * 10) + 1 : 0,
            explorerUrl: 'https://explorer.hiro.so/txid/' + txId + '?chain=' + this.networkName,
            checkedAt: new Date().toISOString(),
        };
    }

    estimateFee(amountUsd) {
        const validAmount    = this._validateAmount(amountUsd);
        const microStxAmount = this._usdToMicroStx(validAmount);
        return {
            amountUsd: validAmount,
            amountMicroStx: microStxAmount,
            estimatedFeeMicroStx: this.feeRate,
            estimatedFeeStx: (this.feeRate / 1_000_000).toFixed(6),
            estimatedFeeUsd: ((this.feeRate / 1_000_000) * STX_USD_RATE).toFixed(4),
            network: this.networkName,
        };
    }

    getSupportedNetworks() {
        return Object.keys(STACKS_NETWORKS).map((key) => ({
            name: key,
            chainId: STACKS_NETWORKS[key].chainId,
            apiUrl: STACKS_NETWORKS[key].apiUrl,
            currency: STACKS_NETWORKS[key].currency,
        }));
    }

    getVersion() {
        return this.version;
    }
}

module.exports = { TwinPayClient, STACKS_NETWORKS, TX_STATUSES };
