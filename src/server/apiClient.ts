import axios, { type AxiosError } from 'axios';
import { type Session } from 'next-auth/core/types';
import { env } from '~/env.mjs';

// export interface TOptionalToken {
// 	token: string;
// }

// event bus for handling global http errors with singleton pattern
const ApiClient = (
	session: Session | null = null,
	// option?: TOptionalToken,
) => {
	const instance = axios.create({
		baseURL: env.NEXT_APP_API_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	instance.interceptors.request.use((_request) => {
		// only works on get server side props,
		if (session) {
			_request.headers.Authorization = `Bearer ${session.user.accessToken}`;
			// _request.headers['x-tenant-id'] = session.user.tenants[0]?.tenantId ?? '';
		}
		// if (option) {
		// 	_request.headers.Authorization = `Bearer ${option.token}`;
		// 	_request.headers['x-tenant-id'] = option.tenantId ?? '';
		// }
		return _request;
	});

	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError) => {
			console.log(
				'error => ',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				error.response?.request?.path || '',
				JSON.stringify(error.response?.data, null, 2),
			);
			return Promise.reject(error);
		},
	);
	return instance;
};

export default ApiClient;
