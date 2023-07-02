import { type MantineThemeOverride } from '@mantine/core';

export const myTheme: MantineThemeOverride = {
	colorScheme: 'light',
	primaryColor: 'orange',
	defaultRadius: 0,
};

// declare module '@mantine/core' {
// 	export interface MantineThemeOther {
// 		// myCustomProperty: string;
// 		// myCustomFunction: () => void;
// 		fontWeights: {
// 			normal: number;
// 			medium: number;
// 			bold: number;
// 			extraBold: number;
// 		};
// 	}
// }
