import { useMemo } from 'react';

import { ChainLogo } from '../../components/icons/ChainLogo';
import { getChainDisplayName } from './utils';
export function ChainSelectListModal({
  isOpen,
  close,
  chains,
  onSelect,
}: {
  isOpen: boolean;
  close: () => void;
  chains: ChainName[];
  onSelect: (chain: ChainName) => void;
}) {
  const onSelectChain = (chain: ChainName) => {
    return () => {
      onSelect(chain);
      close();
    };
  };

  const bgColor: string[] = [
    'bg-[#000aa1]',
    'bg-gray-250'
  ]

  const sortedChains = useMemo(() => chains.sort(), [chains]);
  console.log(sortedChains);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30">
      <div className="fixed inset-0 bg-black/25 backdrop-blur-xl" onClick={close} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div
            className="w-full max-w-xl transform overflow-hidden rounded-3xlp-8 text-left align-middle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center text-xl font-medium leading-6 text-center mb-6 bg-[#FFFFFF1A] w-[182px] h-[56px] rounded-full">
                <span className="text-white">Select network</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {sortedChains.map((c, index) => (
                <button
                  key={c}
                  className={`flex flex-col items-center justify-center rounded-2xl w-[172px] h-[211px] ${bgColor[index]} opacity-0 animate-fadeIn`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={onSelectChain(c)}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <ChainLogo chainName={c} size={80} background={false} />
                  </div>
                  <span className="mt-8 text-sm text-white">{getChainDisplayName(c, true)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}