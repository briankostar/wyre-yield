import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import { AppContext } from "./_app";
import { useCreateWalletOrder } from "../hooks/wyre";
import InterestCounter from "../components/InterestCounter";

function calcInterestPerSecond(principal, rate) {
  const period = 1; // 1 year
  const yearlyInterest = principal * ((1 + rate) ^ (period - 1));
  const interestPerSecond = yearlyInterest / (365 * 24 * 60 * 60);
  return interestPerSecond;
}

export default function Dashboard() {
  const [app, setApp] = React.useContext(AppContext);
  const walletOrder = useCreateWalletOrder(app?.account?.wyreAccount || null);

  const usdcBalance = app?.wallet?.availableBalances.USDC || 0;
  const usdcAPY = app?.wallet?.savingRates.USDC || 0.08;

  function onFundAccount() {
    console.log("onFundAccount", walletOrder);
  }

  return (
    <div>
      <nav className="flex items-center justify-between align-middle flex-wrap bg-gradient-to-r from-green-400 to-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight cursor-pointer">
              Thresholds.io
            </span>
          </Link>
        </div>

        <div>
          <div className="text-sm text-white">Hi, {app.account.email}</div>
        </div>
      </nav>
      <div className="mx-auto max-w-lg px-8 mt-16">
        <div className="border-2 rounded-lg p-8">
          <div>
            <div className="mb-8">
              <div className="font-bold">Address:</div>
              {app.wallet.depositAddresses.ETH}
            </div>
            <div className="mb-8">
              <div className="font-bold">APY:</div>{" "}
              {app.wallet.savingRates.USDC * 100} % on USDC
            </div>
            <div className="mb-8">
              <div className="font-bold">Your Balance: </div>
              <div className="text-3xl font-bold ">
                ${" "}
                <InterestCounter
                  principal={usdcBalance}
                  apy={usdcAPY}
                ></InterestCounter>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a href={walletOrder?.url || "#"} target="_blank">
              <button className="btn btn-blue" onClick={onFundAccount}>
                Fund Your Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
