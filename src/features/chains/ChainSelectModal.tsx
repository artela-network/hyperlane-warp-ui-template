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

  const sortedChains = useMemo(() => chains.sort(), [chains]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="max-w-4xl max-h-[90vh] overflow-y-auto w-full">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium">选择网络</h2>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full p-6">
            {sortedChains.map((c, index) => {
              const chainName = getChainDisplayName(c, true);
              const bgColorClass = c === 'ethereum' ? 'bg-gradient-to-b from-[#88AAF1] to-[#C9B3F5]' :
                c === 'base' ? 'bg-blue-600' :
                  c === 'optimism' ? 'bg-red-500' :
                    c === 'bsc' ? 'bg-[#FFE900]' :
                      'bg-gray-100';
              const textColorClass = ['bsc', 'mode'].includes(c) ? 'text-black' : 'text-white';

              return (
                <button
                  key={c}
                  onClick={onSelectChain(c)}
                  className={`relative w-full aspect-[3.25/4] shrink-0 flex flex-col cursor-pointer overflow-hidden rounded-2xl shadow-sm ${bgColorClass} animate-fadeIn hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: `fadeInScale 0.5s ease-out ${index * 100}ms forwards`
                  }}
                >
                  <div className="flex gap-4 flex-col capitalize items-center justify-center px-3 md:px-6 grow w-full relative z-10">
                    <ChainLogo chainName={c} size={80} background={false} />
                    <h3 className={`text-xs md:text-sm text-center font-heading ${textColorClass}`}>
                      {chainName}
                    </h3>
                  </div>
                  <style jsx>{`
                    @keyframes fadeInScale {
                      0% {
                        opacity: 0;
                        transform: scale(0.9);
                      }
                      100% {
                        opacity: 1;
                        transform: scale(1);
                      }
                    }
                  `}</style>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
