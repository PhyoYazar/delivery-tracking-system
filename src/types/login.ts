export interface Form {
	email: string;
	password: string;
}

export interface LoginResponse {
	id: string;
	name: string;
	email: string;
	access_token: string;
	refresh_token: string;
}
