import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
	styles: {
		global: {
			p: {},
		},
	},
	fonts: {
		heading: "GT-America-Extended",
		body: "GT-America",
	},
	colors: {
		black: "#273C2C",
		mantis: {
			50: "#ebfbe4",
			100: "#d1eec1",
			200: "#b5e19c",
			300: "#97d576",
			400: "#7bc950",
			500: "#61af36",
			600: "#4b8829",
			700: "#34611c",
			800: "#1d3b0e",
			900: "#051500",
		},
		olive: {
			50: "#ecf6ee",
			100: "#d1e1d4",
			200: "#b4ccb9",
			300: "#96b89e",
			400: "#78a483",
			500: "#5e8a69",
			600: "#496b51",
			700: "#344d3a",
			800: "#1e2e22",
			900: "#051007",
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
			50: "#738290",
			100: "#738290",
			200: "#738290",
			300: "#738290",
			400: "#738290",
			500: "#738290",
			600: "#738290",
			700: "#738290",
			800: "#738290",
			900: "#738290",
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
			baseStyle: {
				color: "black",
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
					bg: "#F05D23",
					color: "white",
				},
				black: {
					bg: "black",
					color: "white",
					_hover: {
						bg: "#000",
						color: "white",
					},
				},
			},
			defaultProps: {
				colorScheme: "mantis",
				fontFamily: "GT-America-Extended",
				fontWeight: 500,
			},
		},
	},
});

export default theme;
