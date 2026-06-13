const { TwinPayClient } = require("../index.js");
const pay = new TwinPayClient();
console.log("⚡ Triggering TwinPay AI Automated Payment Agent on Stacks...");
pay.initiateAiPayment("0xward.btc", 50.00).then(res => console.log("Payment Invoice:", res));
console.log("✅ [twinpayai-client] Demo running successfully!");