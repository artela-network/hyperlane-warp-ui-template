import type { NextPage } from 'next';

import { Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import Icon from "../../public/icon/icon3.svg";
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
  );
};

export default Home;
