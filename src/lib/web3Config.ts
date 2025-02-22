
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

// Create wagmi config
const walletConnectProjectId = '45ce2599389325d3414e9ad2876b4754'; // WalletConnect Project ID

const { connectors } = getDefaultWallets({
  appName: 'WriteXchange',
  projectId: walletConnectProjectId,
});

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors,
});

export const chains = [mainnet, polygon];
