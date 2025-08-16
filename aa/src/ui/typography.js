// UI Kit: Typography
// Стили для заголовков, подзаголовков, параграфов

/** @type {import('react-native').TextStyle} */
const bold = "bold";
/** @type {import('react-native').TextStyle} */
const normal = "normal";

/** @type {Record<string, import('react-native').TextStyle>} */
export const typography = {
	h1: {
		fontSize: 32,
		fontWeight: bold,
		lineHeight: 40,
		letterSpacing: 0.5,
	},
	h2: {
		fontSize: 28,
		fontWeight: bold,
		lineHeight: 36,
		letterSpacing: 0.5,
	},
	h3: {
		fontSize: 24,
		fontWeight: bold,
		lineHeight: 32,
		letterSpacing: 0.5,
	},
	h4: {
		fontSize: 20,
		fontWeight: bold,
		lineHeight: 28,
		letterSpacing: 0.25,
	},
	h5: {
		fontSize: 16,
		fontWeight: bold,
		lineHeight: 24,
		letterSpacing: 0.15,
	},
	h6: {
		fontSize: 14,
		fontWeight: bold,
		lineHeight: 20,
		letterSpacing: 0.1,
	},
	paragraph: {
		fontSize: 14,
		fontWeight: normal,
		lineHeight: 20,
		letterSpacing: 0.1,
	},
};
