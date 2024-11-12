import type { NextPage } from 'next';

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
            href='https://docs.google.com/forms/d/e/1FAIpQLSeEgewH4jyiVwCdBerJ8SezRYN96G-9XhGtMlEC7YopFYRX7g/viewform' target='_blank'
            className='flex items-center gap-2 cursor-pointer hover:opacity-80 underline underline-offset-2'>
            Feedback
            <Image src={Icon} alt='Feedback icon' width={8} height={8} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
