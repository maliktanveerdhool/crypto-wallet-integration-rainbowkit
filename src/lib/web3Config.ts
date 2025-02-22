
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

const walletConnectProjectId = '45ce2599389325d3414e9ad2876b4754';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId: walletConnectProjectId, chains: [mainnet, polygon] }),
      coinbaseWallet({ appName: 'WriteXchange', chains: [mainnet, polygon] })
    ],
  },
]);

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors,
});

export const chains = [mainnet, polygon];
