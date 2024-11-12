import { useField, useFormikContext } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IToken } from '@hyperlane-xyz/sdk';

import { TokenIcon } from '../../components/icons/TokenIcon';
import { getIndexForToken, getTokenByIndex, getWarpCore } from '../../context/context';
import ChevronIcon from '../../images/icons/chevron-down.svg';
import { TransferFormValues } from '../transfer/types';

import { TokenListModal } from './TokenListModal';

type Props = {
  name: string;
  disabled?: boolean;
  setIsNft: (value: boolean) => void;
};

export function TokenSelectField({ name, disabled, setIsNft }: Props) {
  const { values } = useFormikContext<TransferFormValues>();
  const [field, , helpers] = useField<number | undefined>(name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutomaticSelection, setIsAutomaticSelection] = useState(false);

  const { origin, destination } = values;
  useEffect(() => {
    const tokensWithRoute = getWarpCore().getTokensForRoute(origin, destination);
    let newFieldValue: number | undefined;
    let newIsAutomatic: boolean;
    // No tokens available for this route
    if (tokensWithRoute.length === 0) {
      newFieldValue = undefined;
      newIsAutomatic = true;
    }
    // Exactly one found
    else if (tokensWithRoute.length === 1) {
      newFieldValue = getIndexForToken(tokensWithRoute[0]);
      newIsAutomatic = true;
      // Multiple possibilities
    } else {
      newFieldValue = undefined;
      newIsAutomatic = false;
    }
    helpers.setValue(newFieldValue);
    setIsAutomaticSelection(newIsAutomatic);
  }, [origin, destination, helpers]);

  const onSelectToken = (newToken: IToken) => {
    // Set the token address value in formik state
    helpers.setValue(getIndexForToken(newToken));
    // Update nft state in parent
    setIsNft(newToken.isNft());
  };

  const onClickField = () => {
    if (!disabled && !isAutomaticSelection) setIsModalOpen(true);
  };

  return (
    <>
      <TokenButton
        token={getTokenByIndex(field.value)}
        disabled={isAutomaticSelection || disabled}
        onClick={onClickField}
        isAutomatic={isAutomaticSelection}
      />
      <TokenListModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        onSelect={onSelectToken}
        origin={values.origin}
        destination={values.destination}
      />
    </>
  );
}

function TokenButton({
  token,
  disabled,
  onClick,
  isAutomatic,
}: {
  token?: IToken;
  disabled?: boolean;
  onClick?: () => void;
  isAutomatic?: boolean;
}) {
  return (
    <button
      type="button"
      className={`${styles.base} ${disabled ? styles.disabled : styles.enabled} bg-[#E6F4FF]`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {token && (
          token.symbol === 'ART' ? (
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
            <TokenIcon token={token} size={20} />
          )
        )}
        <span className={`ml-2 ${!token?.symbol && 'text-slate-400'}`}>
          {token?.symbol || (isAutomatic ? 'No routes available' : 'Select Token')}
        </span>
      </div>
      {!isAutomatic && <Image src={ChevronIcon} width={12} height={8} alt="" />}
    </button>
  );
}

const styles = {
  base: 'mt-1.5 w-full px-2.5 py-2.5 flex items-center justify-between text-sm rounded-lg outline-none transition-colors duration-500',
  enabled: 'hover:bg-gray-100 active:scale-95 focus:border-primary-500',
  disabled: 'bg-gray-100 cursor-default',
};
