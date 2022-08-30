import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

const theme = extendTheme({
	fonts: {
		heading: `"GT-America-Extended"`,
	},
	colors: {
		yellow: {
			50: "#fff6de",
			100: "#f7e4b7",
			200: "#efd28d",
			300: "#e7c063",
			400: "#e1ad38", // Brand
			500: "#c7941e",
			600: "#9b7316",
			700: "#70520d",
			800: "#433103",
			900: "#1a0f00",
		},
		green: {
			50: "#eaf9e8",
			100: "#cce7c9",
			200: "#add5a9",
			300: "#8dc488",
			400: "#6eb367",
			500: "#54994d",
			600: "#41773b", // Brand
			700: "#2d5529",
			800: "#1a3317",
			900: "#021300",
		},
	},
	components: {
		Text: {
			variants: {
				body: {
					fontFamily: "GT-America",
					lineHeight: 1.4,
					color: "black",
					fontSize: "lg",
				},
			},
		},
		Button: {
			variants: {
				"brand-main": (props: StyleFunctionProps) => ({
					bg: props.colorMode === "dark" ? "yellow.100" : "yellow.400",
					fontFamily: "GT-America-Extended",
					fontWeight: 500,
				}),
			},
			defaultProps: {
				colorScheme: "yellow",
			},
		},
	},
});

export default theme;
