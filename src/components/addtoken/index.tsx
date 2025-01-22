import { Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import addSvg from "../../../public/icon/add.svg";
import copySvg from "../../../public/icon/copy.svg";
import exploreSvg from "../../../public/icon/explore.svg";


export const AddArtelaNetwork = ({ chainName, name, symbol, image, address, decimals }: { chainName: string, name: string, symbol: string, image: string, address: string, decimals: number }) => {
  const [copyTooltip, setCopyTooltip] = useState('Copy Address');

  const handleAddToken = async () => {
    try {
      if (chainName.toLowerCase() === 'solana') {
        // Check if Phantom wallet is installed
        const { solana } = window;
        if (!solana?.isPhantom) {
          window.open('https://phantom.app/', '_blank');
          return;
        }

        // Add SPL token to Phantom wallet
        try {
          await solana.request({
            method: "wallet_watchAsset",
            params: {
              type: "SPL", // Solana's token type
              options: {
                address: address, // Token mint address
                symbol: symbol,
                decimals: decimals,
                image: image,
              },
            },
          });
        } catch (err) {
          console.error("Failed to add SPL token to wallet:", err);
        }
      } else {
        // Existing Ethereum chain handling code
        const ethereum = window.ethereum;
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const networkParams = {
          artela: {
            chainId: `0x${Number(11820).toString(16)}`,
            chainName: 'Artela Mainnet',
            nativeCurrency: {
              name: 'Artela',
              symbol: 'ART',
              decimals: 18
            },
            rpcUrls: ['https://node-euro.artela.network/rpc'],
            blockExplorerUrls: ['https://artscan.artela.network/']
          },
          base: {
            chainId: `0x${Number(8453).toString(16)}`,
            chainName: 'Base Mainnet',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://mainnet.base.org'],
            blockExplorerUrls: ['https://basescan.org']
          }
        };

        if (chainName.toLowerCase() !== 'solana') {
          // @ts-ignore
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams[chainName.toLowerCase()]]
          });

          await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: address,
                symbol: symbol,
                decimals: decimals,
                image: image,
              },
            },
          });
        } else {
          // For Solana, open Phantom wallet website if not installed
          if (!window.solana) {
            window.open('https://phantom.app/', '_blank');
            return;
          }
          // Solana token handling would go here
          // Note: Solana has different wallet interaction methods
        }
      }
    } catch (error) {
      console.error(`Error adding ${chainName} network:`, error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopyTooltip('Copied');
    setTimeout(() => {
      setCopyTooltip('Copy Address');
    }, 2000);
  };

  const getExplorerUrl = () => {
    const explorers = {
      artela: `https://www.okx.com/web3/explorer/artela/address/${address}`,
      base: `https://basescan.org/address/${address}`,
      solana: `https://solscan.io/address/${address}`
    };
    return explorers[chainName.toLowerCase()];
  };

  return (
    <div className='flex justify-center gap-2 mt-2 sm:min-w-[244px]'>
      <div className='flex w-full justify-between items-center gap-1.5 px-2 py-1 bg-white rounded-lg shadow-sm'>
        <div className='flex items-center gap-1'>
          <Image src={image} alt={name} width={18} height={18} className="rounded-full" />
          <div className='font-medium text-sm'>{name}</div>
        </div>
        <div className='text-gray-500 text-sm'>
          {address.slice(0, 4)}...{address.slice(-4)}
        </div>
        <div className='flex gap-0.5'>
          <Tooltip label='Add to MetaMask' hasArrow placement='top'>
            <div
              className='flex items-center cursor-pointer hover:opacity-80'
              onClick={handleAddToken}
            >
              <Image src={addSvg} alt='Add Token' width={16} height={16} />
            </div>
          </Tooltip>
          <Tooltip label={copyTooltip} hasArrow placement='top'>
            <div className='flex'>
              <Image
                src={copySvg}
                alt='Copy Address'
                width={16}
                height={16}
                className='cursor-pointer hover:opacity-80'
                onClick={handleCopy}
              />
            </div>
          </Tooltip>
          <Tooltip label='View on Explorer' hasArrow placement='top'>
            <div
              onClick={() => window.open(getExplorerUrl(), '_blank')}
            >
              <Image
                src={exploreSvg}
                alt='View on Explorer'
                width={16}
                height={16}
                className='cursor-pointer hover:opacity-80'
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
