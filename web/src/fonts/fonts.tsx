import React from "react";
import { css, Global } from "@emotion/react";
import PicNic from './Picnic-Regular.woff2'
import GTAmericaExtendedMedium from './GTAmerica-ExtendedMedium.woff'

const Fonts = () => (
	<Global
		styles={css`
    /* PicNic */
      @font-face {
        font-family: 'PicnicFont';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${PicNic}) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    /* GT America */
      @font-face {
        font-family: 'GT-America-Extended';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(${GTAmericaExtendedMedium}) format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
	/>
);

export default Fonts