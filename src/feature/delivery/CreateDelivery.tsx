import {
	Box,
	Button,
	NumberInput,
	PasswordInput,
	ScrollArea,
	Stack,
	TextInput,
} from '@mantine/core';

export const CreateDeliveryEmployee = () => {
	return (
		<Stack>
			<ScrollArea h='65vh' offsetScrollbars>
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

					<PasswordInput label='Password' placeholder='123Je#$' withAsterisk />

					<NumberInput label='Age' placeholder='20' />
					{/* 
					<TextInput label='Example' placeholder='example text ...' />
					<TextInput label='Example' placeholder='example text ...' />
					<TextInput label='Example' placeholder='example text ...' /> */}
				</Stack>
			</ScrollArea>

			<Box ta={'end'}>
				<Button loading={false}>Create</Button>
			</Box>
		</Stack>
	);
};
