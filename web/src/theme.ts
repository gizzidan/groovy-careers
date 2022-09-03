import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
	fonts: {
		heading: "GT-America-Extended",
		body: "GT-America",
	},
	colors: {
		black: "#313638",
		green: {
			50: "#e1fcf2",
			100: "#bef2dc",
			200: "#97e8c6",
			300: "#6fdeaf",
			400: "#4ad599",
			500: "#31bb80",
			600: "#249263",
			700: "#176846",
			800: "#093e29",
			900: "#00170b",
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
			50: "#dafdff",
			100: "#aef1ff",
			200: "#7fe7fd",
			300: "#51ddfb",
			400: "#2ad3f9",
			500: "#18b9df",
			600: "#0490ae",
			700: "#00677e",
			800: "#003f4d",
			900: "#00171d",
		},
		gray: {
			50: "#e7f6f6",
			100: "#d3dbdd",
			200: "#bbc1c4",
			300: "#a1a8ab",
			400: "#888f92",
			500: "#6e7578",
			600: "#545c5e",
			700: "#3c4244",
			800: "#22272b",
			900: "#050e15",
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
		Badge: {
			variants: {},
			baseStyle: {
				fontFamily: "GT-America",
			},
		},
		Tag: {
			defaultProps: {
				colorScheme: "blackOutline",
				variant: "outline",
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
						bg: "green.600",
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
				colorScheme: "green",
				fontFamily: "GT-America-Extended",
				fontWeight: 500,
			},
		},
	},
});

export default theme;
