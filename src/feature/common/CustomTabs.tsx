import { Tabs, rem, type Sx, type TabsProps } from '@mantine/core';

export function StyledTabs(props: TabsProps) {
	return (
		<Tabs
			unstyled
			styles={(theme) => ({
				tab: {
					...(theme.fn.focusStyles() as Sx),
					'backgroundColor':
						theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
					'color':
						theme.colorScheme === 'dark'
							? theme.colors.dark[0]
							: theme.colors.gray[9],
					'border': `${rem(1)} solid ${
						theme.colorScheme === 'dark'
							? theme.colors.dark[6]
							: theme.colors.gray[4]
					}`,
					'padding': `${theme.spacing.xs} ${theme.spacing.md}`,
					'cursor': 'pointer',
					'fontSize': theme.fontSizes.sm,
					'display': 'flex',
					'alignItems': 'center',

					'&:disabled': {
						opacity: 0.5,
						cursor: 'not-allowed',
					},

					'&:not(:first-of-type)': {
						borderLeft: 0,
					},

					'&:first-of-type': {
						borderTopLeftRadius: theme.radius.md,
						borderBottomLeftRadius: theme.radius.md,
					},

					'&:last-of-type': {
						borderTopRightRadius: theme.radius.md,
						borderBottomRightRadius: theme.radius.md,
					},

					'&[data-active]': {
						backgroundColor: theme.colors.blue[7],
						borderColor: theme.colors.blue[7],
						color: theme.white,
					},
				},

				tabIcon: {
					marginRight: theme.spacing.xs,
					display: 'flex',
					alignItems: 'center',
				},

				tabsList: {
					display: 'flex',
				},
			})}
			{...props}
		/>
	);
}
