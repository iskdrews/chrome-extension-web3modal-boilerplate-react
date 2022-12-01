import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

const chains = [chain.mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);

const wagmiClient = createClient({
autoConnect: true,
connectors: modalConnectors({ appName: "web3Modal", chains }),
provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

render(
    <>
        <WagmiConfig client={wagmiClient}>
            <Popup />
        </WagmiConfig>
        <Web3Modal
            projectId="<YOUR_PROJECT_ID>"
            ethereumClient={ethereumClient}
        />     
    </>
, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
