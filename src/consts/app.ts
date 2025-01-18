// import { Space_Grotesk } from 'next/font/google';

import localFont from 'next/font/local';
import { Color } from '../styles/Color';

export const MAIN_FONT = localFont({
  src: './ppneuemontreal-book.otf',
  display: 'swap',
});

// export const MAIN_FONT = Space_Grotesk({
//   subsets: ['latin'],
//   variable: '--font-main',
//   preload: true,
//   fallback: ['sans-serif'],
// });
export const APP_NAME = 'ArteBridge';
export const APP_DESCRIPTION = 'Artela Bridge is a cross-chain bridging feature built on Hyperlane by Artela. It is designed to enable fast, efficient, and seamless asset transfers across multiple blockchain';
export const APP_URL = 'artbridge.artela.network/';
export const BRAND_COLOR = Color.primary;
export const BACKGROUND_COLOR = Color.primary;
export const BACKGROUND_IMAGE = 'url(/backgrounds/bg.png)';
export const PROXY_DEPLOYED_URL = 'https://api.github.com';
// export const PROXY_DEPLOYED_URL = 'https://proxy.hyperlane.xyz';
