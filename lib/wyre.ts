const axios = require("axios");

const wyreAccount = process.env.WYRE_ACCOUNT;
const wyreKey = process.env.WYRE_SECRET_KEY;
const wyreUri = "https://api.testwyre.com";
const config = {
  headers: { Authorization: `Bearer ${wyreKey}` },
};

export async function createWallet(email, accountId) {
  const newWallet = {
    type: "SAVINGS",
    name: accountId,
    notes: email,
  };

  console.log("making new wallet for:", accountId);

  return axios
    .post(wyreUri + "/v2/wallets", newWallet, config)
    .then((res) => {
      const wallet = res.data.id;
      console.log("Success creating Wallet", res.data);
      return wallet;
    })
    .catch(function (err) {
      console.log("Err creating Wallet", err.response);
    });
}

export async function getWallet(walletId) {
  console.log("getWallet for:", walletId);

  return axios
    .get(wyreUri + `/v2/wallet/${walletId}`, config)
    .then((res) => {
      const wallet = res.data;
      console.log("Success getting Wallet", wallet);
      return wallet;
    })
    .catch(function (err) {
      console.log("Err getting Wallet", err.response);
    });
}

export async function createAccount(email) {
  const newAccount = {
    profileFields: [{ fieldId: "individualEmail", value: email }],
    type: "INDIVIDUAL",
    country: "US",
    subaccount: true,
  };

  return axios
    .post(wyreUri + "/v3/accounts", newAccount, config)
    .then(async (res) => {
      const accountId = res.data.id;
      console.log("Success creating Account", accountId);
      return accountId;
    })
    .catch(function (err) {
      console.log("Err creating Account", err.data);
    });
}

export async function createWalletOrder() {
  const body = {
    referrerAccountId: wyreAccount,
    destCurrency: "USDC",
    lockFields: ["destCurrency"],
  };

  console.log("createWalletOrder");

  return axios
    .post(wyreUri + `/v3/orders/reserve`, body, config)
    .then(async (res) => {
      const response = res.data;
      console.log("Success creating wallet order", response);
      return response;
    })
    .catch(function (err) {
      console.log("Err creating wallet order", err);
    });
}
