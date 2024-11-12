import Image from 'next/image';
import { useMemo, useState } from 'react';

import { IToken } from '@hyperlane-xyz/sdk';

import { TokenIcon } from '../../components/icons/TokenIcon';
import { TextInput } from '../../components/input/TextField';
import { Modal } from '../../components/layout/Modal';
import { config } from '../../consts/config';
import { getWarpCore } from '../../context/context';
import InfoIcon from '../../images/icons/info-circle.svg';
import { getChainDisplayName } from '../chains/utils';

export function TokenListModal({
  isOpen,
  close,
  onSelect,
  origin,
  destination,
}: {
  isOpen: boolean;
  close: () => void;
  onSelect: (token: IToken) => void;
  origin: ChainName;
  destination: ChainName;
}) {
  const [search, setSearch] = useState('');

  const onClose = () => {
    close();
    setSearch('');
  };

  const onSelectAndClose = (token: IToken) => {
    onSelect(token);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Select Token"
      close={onClose}
      width="max-w-100 sm:max-w-[31rem] min-h-[24rem]"
    >
      <TextInput
        value={search}
        onChange={setSearch}
        placeholder="Name, symbol, or address"
        name="token-search"
        classes="mt-3 mb-4 sm:py-2.5 w-full"
        autoComplete="off"
      />
      <TokenList
        origin={origin}
        destination={destination}
        searchQuery={search}
        onSelect={onSelectAndClose}
      />
    </Modal>
  );
}

export function TokenList({
  origin,
  destination,
  searchQuery,
  onSelect,
}: {
  origin: ChainName;
  destination: ChainName;
  searchQuery: string;
  onSelect: (token: IToken) => void;
}) {
  const tokens = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase();
    const warpCore = getWarpCore();
    const multiChainTokens = warpCore.tokens.filter((t) => t.isMultiChainToken());
    const tokensWithRoute = warpCore.getTokensForRoute(origin, destination);
    return (
      multiChainTokens
        .map((t) => ({
          token: t,
          disabled: !tokensWithRoute.includes(t),
        }))
        .sort((a, b) => {
          if (a.disabled && !b.disabled) return 1;
          else if (!a.disabled && b.disabled) return -1;
          else return 0;
        })
        // Filter down to search query
        .filter((t) => {
          if (!q) return t;
          return (
            t.token.name.toLowerCase().includes(q) ||
            t.token.symbol.toLowerCase().includes(q) ||
            t.token.addressOrDenom.toLowerCase().includes(q)
          );
        })
        // Hide/show disabled tokens
        .filter((t) => (config.showDisabledTokens ? true : !t.disabled))
    );
  }, [searchQuery, origin, destination]);

  return (
    <div className="flex flex-col items-stretch">
      {tokens.length ? (
        tokens.map((t, i) => (
          <button
            className={`-mx-2 mb-2 flex items-center rounded px-2 py-2 ${t.disabled ? 'opacity-50' : 'hover:bg-gray-200'
              } duration-250 transition-all`}
            key={i}
            type="button"
            disabled={t.disabled}
            onClick={() => onSelect(t.token)}
          >
            <div className="shrink-0">
              {t.token.symbol === 'ART' ? (
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_11677_89148)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.06197 27.2204L16.6041 7.22892C16.7803 6.92369 17.2202 6.92369 17.3964 7.22892L28.9395 27.2195C29.1157 27.5247 28.8952 27.9063 28.5429 27.9063H25.7063C25.5641 27.9063 25.4322 27.83 25.3625 27.7056L17.3436 13.4993C17.1929 13.2317 16.8076 13.2317 16.6569 13.4993L8.52499 27.9072H5.45858C5.10624 27.9072 4.8858 27.5257 5.06197 27.2204ZM11.8478 27.9066L16.4846 19.8755C16.7136 19.4789 17.2863 19.4789 17.5153 19.8755L22.1521 27.9066H11.8478Z" fill="#0000C9" />
                  </g>
                  <defs>
                    <clipPath id="clip0_11677_89148">
                      <rect width="24" height="20.9063" fill="white" transform="translate(5 7)" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <TokenIcon token={t.token} size={30} />
              )}
            </div>
            <div className="ml-2 shrink-0 text-left">
              <div className="w-14 truncate text-sm">{t.token.symbol || 'Unknown'}</div>
              <div className="w-14 truncate text-xs text-gray-500">{t.token.name || 'Unknown'}</div>
            </div>
            <div className="ml-2 min-w-0 shrink text-left">
              <div className="w-full truncate text-xs">
                {t.token.addressOrDenom || 'Native chain token'}
              </div>
              <div className="mt-0.5 flex space-x-1 text-xs">
                <span>{`Decimals: ${t.token.decimals}`}</span>
                <span>-</span>
                <span>{`Chain: ${getChainDisplayName(t.token.chainName)}`}</span>
              </div>
            </div>
            {t.disabled && (
              <Image
                src={InfoIcon}
                alt=""
                className="ml-auto mr-1"
                data-te-toggle="tooltip"
                title={`Route not supported for ${getChainDisplayName(
                  origin,
                )} to ${getChainDisplayName(destination)}`}
              />
            )}
          </button>
        ))
      ) : (
        <div className="my-8 text-center text-gray-500">
          <div>No tokens found</div>
          <div className="mt-2 text-sm">Try a different destination chain or search query</div>
        </div>
      )}
    </div>
  );
}
