import { type GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

const EmployeePage = () => {
	return <div>EmployeePage</div>;
};

export default EmployeePage;

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	const session = await getSession({ req: _context.req });

	if (
		session?.user.role &&
		!['picker', 'deliver'].includes(session.user.role)
	) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {}, // will be passed to the page component as props
	};
}
