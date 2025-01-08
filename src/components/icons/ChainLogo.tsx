import Image from 'next/image';
import { useMemo } from 'react';

import { ChainLogo as ChainLogoInner } from '@hyperlane-xyz/widgets';

import artelaLogo from '../../../public/logos/artela.svg';
import { getRegistry } from '../../context/context';
import { tryGetChainMetadata } from '../../features/chains/utils';

export function ChainLogo({
  chainId,
  chainName,
  background,
  size,
}: {
  chainId?: ChainId;
  chainName?: string;
  background?: boolean;
  size?: number;
}) {
  const registry = getRegistry();
  const { name, Icon } = useMemo(() => {
    const chainNameOrId = chainName || chainId;
    if (!chainNameOrId) return { name: '' };
    const chainMetadata = tryGetChainMetadata(chainNameOrId);
    const name = chainMetadata?.name || '';
    const logoUri = chainMetadata?.logoURI;
    const Icon = logoUri
      ? (props: { width: number; height: number; title?: string }) => (
        <Image src={logoUri} alt="" {...props} />
      )
      : undefined;
    return {
      name,
      Icon,
    };
  }, [chainName, chainId]);

  switch (name) {
    case "artelatestnet":
      return (
        <Image
          src={artelaLogo}
          alt="Artela Logo"
          width={size || 24}
          height={size || 24}
        />
      );
    default:
      return (
        <ChainLogoInner
          chainName={name}
          registry={registry}
          size={size}
          background={background}
          Icon={Icon}
        />
      );
  }
}
