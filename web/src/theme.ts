import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
	styles: {
		global: {
			p: {},
			".ais-Hits-list": {
				listStyleType: "none",
			},
			".ais-Highlight-highlighted": {
				bg: "pink.200",
				fontStyle: "normal",
			},
			".ais-SearchBox-form": {
				backgroundColor: "whiteAlpha.50",
				display: "flex",
				fontSize: "md",
				height: "2.5rem",
				lineHeight: "1.35rem",
				position: "relative",
				width: "xs",
			},
			".ais-SearchBox-form::before": {
				background:
					"rgba(0, 0, 0, 0) url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235a5e9a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%3E%3C%2Fcircle%3E%3Cline%20x1%3D%2221%22%20y1%3D%2221%22%20x2%3D%2216.65%22%20y2%3D%2216.65%22%3E%3C%2Fline%3E%3C%2Fsvg%3E') repeat scroll 0% 0%",
				content: '""',
				height: "1rem",
				left: "1rem",
				marginTop: "-0.5rem",
				position: "absolute",
				top: "50%",
				width: "1rem",
			},
			".ais-SearchBox-input": {
				appearance: "none",
				borderWidth: "1px",
				borderColor: "gray.200",
				borderRadius: "base",
				caretColor: "gray.600",
				flex: "1 1 0%",
				font: "inherit",
				maxWidth: "100%",
				paddingLeft: "2.5rem",
				outlineStyle: "none",
			},
			".ais-SearchBox-input::-webkit-input-placeholder": {
				color: "gray.400",
			},
			".ais-SearchBox-input::placeholder": {
				color: "gray.400",
			},
			".ais-SearchBox-input:focus": {
				borderColor: "mantis.600",
				outlineStyle: "solid",
				outlineColor: "mantis.600",
			},
			".ais-SearchBox-input::-webkit-search-cancel-button, .ais-SearchBox-input::-webkit-search-decoration, .ais-SearchBox-input::-webkit-search-results-button, .ais-SearchBox-input::-webkit-search-results-decoration": {
				appearance: "none",
			},
			".ais-SearchBox-loadingIndicator, .ais-SearchBox-reset": {
				alignItems: "center",
				borderRadius: "50%",
				display: "flex",
				fill: "grey.700",
				height: "20px",
				justifyContent: "center",
				position: "absolute",
				right: "1rem",
				top: "50%",
				transform: "translateY(-50%)",
				width: "20px",
			},
			".ais-SearchBox-reset:focus": {
				background: "grey.300",
				fill: "whiteAlpha.50",
				outline: "0",
			},
			".ais-RefinementList-searchBox .ais-SearchBox-loadingIndicator, .ais-RefinementList-searchBox.ais-SearchBox-reset": {
				right: "0.5rem",
			},
			".ais-SearchBox-loadingIndicator[hidden], .ais-SearchBox-reset[hidden]": {
				display: "none",
			},
			".ais-SearchBox-submit": {
				display: "none",
			},
			".ais-RefinementList-checkbox, .ais-GeoSearch-input": {
				appearance: "none",
				backgroundColor: "whiteAlpha.50",
				backgroundPosition: "50%",
				backgroundSize: "180%",
				border: "1px solid currentcolor",
				borderRadius: "3px",
				color: "gray.200",
				cursor: "pointer",
				height: "1rem",
				mr: ".5rem",
				mb: "-0.1rem",
				minWidth: "1rem",
			},
			".ais-RefinementList-item--selected .ais-RefinementList-checkbox, .ais-GeoSearch-input:checked": {
				backgroundImage:
					"url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-check%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",
				backgroundSize: "14px",
				borderColor: "currentcolor",
				color: "mantis.600",
				backgroundColor: "mantis.200",
			},
			"ais-NumericMenu-label, .ais-ToggleRefinement-label, .ais-HierarchicalMenu-item, .ais-Menu-item, .ais-RatingMenu-item, .ais-RefinementList-item": {
				alignItems: "center",
				fontFamily: "GT-America",
				fontSize: "md",
				cursor: "pointer",
				display: "flex",
				flexWrap: "nowrap",
			},
			".ais-HierarchicalMenu-label, .ais-Menu-label, .ais-RefinementList-labelText": {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			},
			".ais-HierarchicalMenu-item--selected > .ais-HierarchicalMenu-link > .ais-HierarchicalMenu-label, .ais-Menu-item--selected .ais-Menu-label, .ais-RefinementList-item--selected, .ais-RatingMenu-item--selected": {
				fontWeight: "600",
			},
			".ais-ToggleRefinement-count, .ais-HierarchicalMenu-count, .ais-Menu-count, .ais-RatingMenu-count, .ais-RefinementList-count": {
				backgroundColor: "blackAlpha.50",
				borderWidth: "1px",
				borderColor: "blackAlpha.50",
				borderRadius: "99999px",
				color: "blackAlpha.800",
				display: "inline-flex",
				flexShrink: " 0",
				fontSize: "0.75rem",
				fontWeight: "400",
				lineHeight: "1rem",
				marginLeft: "0.5rem",
				overflow: "hidden",
				padding: "0 0.25rem",
			},
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
		purple: {
			"50": "#F4E5FF",
			"100": "#E0B8FF",
			"200": "#CC8AFF",
			"300": "#B85CFF",
			"400": "#A52EFF",
			"500": "#9100FF",
			"600": "#7400CC",
			"700": "#570099",
			"800": "#3A0066",
			"900": "#1D0033",
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
				filter: {
					fontFamily: "GT-America",
					fontSize: "md",
					fontWeight: "bold",
					color: "blackAlpha.900",
				},
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
				tip: {
					color: "blackAlpha.600",
					fontSize: "sm",
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
					bg: "#ff4200",
					color: "white",
					_hover: {
						bg: "orange.600",
						textDecoration: "none",
					},
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
