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
export const APP_DESCRIPTION = 'Bridge Your Assets to and from Artela';
export const APP_URL = 'hyperlane-warp-ui-template-gray.vercel.app/';
export const BRAND_COLOR = Color.primary;
export const BACKGROUND_COLOR = Color.primary;
export const BACKGROUND_IMAGE = 'url(/backgrounds/main.svg)';
export const PROXY_DEPLOYED_URL = 'https://api.github.com';
// export const PROXY_DEPLOYED_URL = 'https://proxy.hyperlane.xyz';
