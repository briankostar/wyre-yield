import React, { useEffect, useState } from "react";

function calcInterestPerSecond(principal, rate) {
  const period = 1; // 1 year
  const yearlyInterest = principal * ((1 + rate) ^ (period - 1));
  const interestPerSecond = yearlyInterest / (365 * 24 * 60 * 60);
  return interestPerSecond;
}

export default function InterestCounter({ principal, apy }) {
  const [balance, setBalance] = useState(principal);
  const interestPerSecond = calcInterestPerSecond(principal, apy);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(balance + interestPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  });

  return <span>{balance}</span>;
}
