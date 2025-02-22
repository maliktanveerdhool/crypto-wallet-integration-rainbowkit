
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

// Create wagmi config
const walletConnectProjectId = 'your-project-id'; // Replace with actual WalletConnect Project ID

const { wallets } = getDefaultWallets({
  appName: 'WriteXchange',
  projectId: walletConnectProjectId,
  chains: [mainnet, polygon],
});

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors: wallets,
});

export const chains = [mainnet, polygon];
