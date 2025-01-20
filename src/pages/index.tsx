import type { NextPage } from 'next';

import { Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import Icon from "../../public/icon/icon3.svg";
import { AddArtelaNetwork } from '../components/addtoken';
import { TipCard } from '../components/tip/TipCard';
import { TransferTokenCard } from '../features/transfer/TransferTokenCard';
import { WalletFloatingButtons } from '../features/wallet/WalletFloatingButtons';
const Home: NextPage = () => {
  return (
    <div className="space-y-3 pt-4">
      <TipCard />
      <div className="relative">
        <WalletFloatingButtons />
        <TransferTokenCard />
        <div className="grid grid-cols-2 gap-2">
          {/* USDC.a Token */}
          <AddArtelaNetwork
            chainName='Artela Mainnet'
            name='USDC.a'
            decimals={6}
            symbol='USDC.a'
            image="https://raw.githubusercontent.com/hyperlane-xyz/hyperlane-registry/main/deployments/warp_routes/USDC/logo.svg"
            address='0x8d9Bd7E9ec3cd799a659EE650DfF6C799309fA91'
          />

          {/* ART Token */}
          <AddArtelaNetwork
            chainName='Artela Mainnet'
            name='Artela'
            decimals={18}
            symbol='ART'
            image="https://raw.githubusercontent.com/hyperlane-xyz/hyperlane-registry/main/deployments/warp_routes/ART/logo.svg"
            address='0x0a78BC3CBBC79C4C6E5d4e5b2bbD042E58e93484'
          />

          {/* WETH.a Token */}
          <AddArtelaNetwork
            chainName='Artela Mainnet'
            name='WETH.a'
            decimals={18}
            symbol='WETH.a'
            image="https://raw.githubusercontent.com/hyperlane-xyz/hyperlane-registry/main/deployments/warp_routes/WETH/logo.svg"
            address='0xfae4e14D01D9E13FB5db20A0329ED0472A2D96C7'
          />
        </div>
        <div>
          <div className='flex justify-center gap-8 mt-4'>
            <a
              href='https://renaissance.artela.network/arthome/FAQ' target='_blank'
              className='flex items-center gap-2 cursor-pointer hover:opacity-80 underline underline-offset-2'>
              FAQs
              <Image src={Icon} alt='FAQs icon' width={8} height={8} />
            </a>

            <a
              href='https://discord.com/channels/1143699396500934796/1143699397956341782'
              target='_blank'
              className='flex items-center gap-2 cursor-pointer hover:opacity-80 underline underline-offset-2'>
              Feedback
              <Image src={Icon} alt='Feedback icon' width={8} height={8} />
              <Tooltip label="Submit a ticket on Discord" hasArrow>
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12" y2="17" />
                </svg>
              </Tooltip>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
