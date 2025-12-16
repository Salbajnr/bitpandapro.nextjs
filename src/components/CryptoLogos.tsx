import React from 'react';

type CryptoLogos = {
  [key: string]: string;
};

export const getCryptoLogo = (symbol: string): string => {
  const logos: CryptoLogos = {
    BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    BNB: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    ADA: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    XRP: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
  };

  return logos[symbol] || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
};

export default getCryptoLogo;
