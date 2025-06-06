
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

const projectId = 'ba20054458ba0c5ff57646a40d166982'; // WalletConnect Project ID

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, coinbaseWallet]
    }
  ],
  {
    appName: 'WriteXchange',
    projectId
  }
);

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors,
});

export const config = wagmiConfig;
export const appChains = [mainnet, polygon];
