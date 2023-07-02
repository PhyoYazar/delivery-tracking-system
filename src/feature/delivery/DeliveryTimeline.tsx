import { Text, Timeline } from '@mantine/core';
import {
	IconGitBranch,
	IconGitCommit,
	IconGitPullRequest,
	IconMessageDots,
} from '@tabler/icons-react';

export const DeliveryTimeline = () => {
	return (
		<Timeline active={1} bulletSize={24} lineWidth={2}>
			<Timeline.Item bullet={<IconGitBranch size={12} />} title='Point 1'>
				<Text color='dimmed' size='sm'>
					You&apos;ve created new branch{' '}
					<Text variant='link' component='span' inherit>
						fix-notifications
					</Text>{' '}
					from master
				</Text>
				<Text size='xs' mt={4}>
					2 hours ago
				</Text>
			</Timeline.Item>

			<Timeline.Item bullet={<IconGitCommit size={12} />} title='Point 2'>
				<Text color='dimmed' size='sm'>
					You&apos;ve pushed 23 commits to
					<Text variant='link' component='span' inherit>
						fix-notifications branch
					</Text>
				</Text>
				<Text size='xs' mt={4}>
					52 minutes ago
				</Text>
			</Timeline.Item>

			<Timeline.Item
				title='Point 3'
				bullet={<IconGitPullRequest size={12} />}
				lineVariant='dashed'
			>
				<Text color='dimmed' size='sm'>
					You&apos;ve submitted a pull request
					<Text variant='link' component='span' inherit>
						Fix incorrect notification message (#187)
					</Text>
				</Text>
				<Text size='xs' mt={4}>
					34 minutes ago
				</Text>
			</Timeline.Item>

			<Timeline.Item title='Point 4' bullet={<IconMessageDots size={12} />}>
				<Text color='dimmed' size='sm'>
					<Text variant='link' component='span' inherit>
						Robert Gluesticker
					</Text>{' '}
					left a code review on your pull request
				</Text>
				<Text size='xs' mt={4}>
					12 minutes ago
				</Text>
			</Timeline.Item>
		</Timeline>
	);
};
