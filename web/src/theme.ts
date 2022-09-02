import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
	fonts: {
		heading: "GT-America-Extended",
		body: "GT-America",
	},
	colors: {
		purple: {
			50: "#feeafe",
			100: "#edc6ed",
			200: "#dea2de",
			300: "#cf7ccf",
			400: "#c158c1",
			500: "#a73ea7",
			600: "#833083",
			700: "#5e215e",
			800: "#39123a",
			900: "#170417",
		},
		yellow: {
			50: "#fcffde",
			100: "#f7fcb2",
			200: "#f2f984",
			300: "#edf755",
			400: "#e7f528",
			500: "#cedb11",
			600: "#a0aa08",
			700: "#727a03",
			800: "#454900",
			900: "#171900",
		},
		accent: {
			50: "#e6f9f1",
			100: "#cae4da",
			200: "#add0c2",
			300: "#8ebeaa",
			400: "#70ab92",
			500: "#569278",
			600: "#41715d",
			700: "#2e5143",
			800: "#183227",
			900: "#00130a",
		},
		gray: {
			50: "#f6f3eb",
			100: "#dddad4",
			200: "#c6c2bb",
			300: "#aea99f",
			400: "#979184",
			500: "#7e776b",
			600: "#635d52",
			700: "#46423a",
			800: "#2b2822",
			900: "#110d04",
		},
		blackOutline: {
			50: "#0d0d0d",
			100: "#0d0d0d",
			200: "#0d0d0d",
			300: "#0d0d0d",
			400: "#0d0d0d",
			500: "#0d0d0d",
			600: "#0d0d0d",
			700: "#0d0d0d",
			800: "#0d0d0d",
			900: "#0d0d0d",
		},
	},
	components: {
		Tag: {
			defaultProps: {
				colorScheme: "blackAlpha",
				variant: "subtle",
				size: "sm",
			},
		},
		Heading: {
			variants: {
				card: {
					fontWeight: "medium",
					fontSize: "md",
				},
			},
		},
		Text: {
			variants: {
				body: {
					fontFamily: "GT-America",
					lineHeight: 1.4,
					color: "black",
					fontSize: "lg",
				},
				mono: {
					fontFamily: "GT-America-Mono",
				},
			},
		},
		Button: {
			baseStyle: {
				fontFamily: "GT-America-Extended",
				fontWeight: 500,
			},
			variants: {
				outline: (props: StyleFunctionProps) => ({
					fontFamily: "GT-America-Extended",
					fontWeight: 500,
					_hover: {
						bg: "green",
						color: "green.50",
					},
				}),
				solid: (props: StyleFunctionProps) => ({
					fontFamily: "GT-America-Extended",
					fontWeight: 500,
				}),
				ghost: (props: StyleFunctionProps) => ({
					fontFamily: "GT-America-Extended",
					fontWeight: 500,
				}),
				brand: {
					bg: "#eff86a",
				},
				black: {
					bg: "#000",
					color: "white",
				},
			},
			defaultProps: {
				colorScheme: "accent",
				fontFamily: "GT-America-Extended",
				fontWeight: 500,
			},
		},
	},
});

export default theme;
