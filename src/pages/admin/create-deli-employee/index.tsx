import {
	Box,
	Button,
	Center,
	Group,
	NumberInput,
	PasswordInput,
	ScrollArea,
	Stack,
	TextInput,
	Title,
	createStyles,
} from '@mantine/core';
import { GoBackButton } from '~/feature/common/GoBackButton';

const CreateDeliEmployeePage = () => {
	const { classes } = useStyles();

	return (
		<Box w='100vw' h='100vh' p={20}>
			<Group align='flex-start' w='100%'>
				<GoBackButton />

				<Center h='100%' w='100%'>
					<Box className={classes.root}>
						<Stack>
							<Center>
								<Title order={3} color='gray.8'>
									Create Delivery Employee
								</Title>
							</Center>

							<ScrollArea h='60vh' offsetScrollbars>
								<Stack>
									<TextInput
										label='Employee name'
										placeholder='Joe Terry'
										withAsterisk
									/>
									<TextInput
										label='Phone Number'
										placeholder='09123456789'
										withAsterisk
									/>

									<TextInput
										label='Address'
										placeholder='No.123, Tarmwe, ...'
										withAsterisk
									/>

									<PasswordInput
										label='Password'
										placeholder='123Je#$'
										withAsterisk
									/>

									<NumberInput label='Age' placeholder='20' />

									<TextInput label='Example' placeholder='example text ...' />
									<TextInput label='Example' placeholder='example text ...' />
									<TextInput label='Example' placeholder='example text ...' />
								</Stack>
							</ScrollArea>

							<Box ta={'end'}>
								<Button loading={false}>Create</Button>
							</Box>
						</Stack>
					</Box>
				</Center>
			</Group>
		</Box>
	);
};

export default CreateDeliEmployeePage;

const useStyles = createStyles((theme) => ({
	root: {
		width: 500,
		padding: theme.spacing.xl,
		border: `1px solid ${theme.colors.gray[4]}`,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.md,
	},
}));
