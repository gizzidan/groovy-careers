import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
	fonts: {
		heading: "GT-America-Extended",
		body: "GT-America",
	},
	colors: {
		red: {
			50: "#ffe6ee",
			100: "#f8bbcd",
			200: "#ee90ab",
			300: "#e6658a",
			400: "#de3a68",
			500: "#c5224f",
			600: "#9a193d",
			700: "#6f102c",
			800: "#44071a",
			900: "#1d0009",
		},
		pink: {
			50: "#ffe7eb",
			100: "#f6bcc4",
			200: "#ee90a3",
			300: "#e66587",
			400: "#e03b71",
			500: "#c72461",
			600: "#9b1b55",
			700: "#6f1243",
			800: "#43092c",
			900: "#1a0113",
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
				colorScheme: "pink",
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
				"brand-main": (props: StyleFunctionProps) => ({
					bg: props.colorMode === "dark" ? "yellow.100" : "yellow.400",
					fontFamily: "GT-America-Extended",
					fontWeight: 500,
					_hover: {
						bg: props.colorMode === "dark" ? "yellow.200" : "yellow.500",
					},
				}),
			},
			defaultProps: {
				colorScheme: "red",
				fontFamily: "GT-America-Extended",
				fontWeight: 500,
			},
		},
	},
});

export default theme;
