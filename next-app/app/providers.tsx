"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

// rainbow kit
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const zkevmTest = {
  id: 1442,
  name: 'polygon-zkevm-testnet',
  network: 'polygon-zkevm-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.public.zkevm-test.net'] },
    default: { http: ['https://rpc.public.zkevm-test.net'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://testnet-zkevm.polygonscan.com' },
  },
} as const satisfies Chain  

const { chains, publicClient } = configureChains(
  [zkevmTest],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

	return (
		<WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
				<NextUIProvider navigate={router.push}>
					<NextThemesProvider {...themeProps}>
						{children}
					</NextThemesProvider>
				</NextUIProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
