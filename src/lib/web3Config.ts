
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

const projectId = '45ce2599389325d3414e9ad2876b4754'; // WalletConnect Project ID

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      ({ projectId }) => metaMaskWallet({ projectId }),
      ({ projectId }) => coinbaseWallet({ appName: 'WriteXchange', projectId })
    ],
  }
]);

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
