import { api } from '../api';

export const useTownship = () => {
	const { data: township, isLoading: townshipIsLoading } =
		api.location.getTownship.useQuery();

	return { township, townshipIsLoading };
};
