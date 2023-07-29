import type { City, Township } from './address';

export interface Deliver {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
	email: string;
	password: string;
	phone_number: string;
	address: string;
	city_id: string;
	city: City;
	township_id: string;
	township: Township;
	role: string;
}

export interface CreateDeliverForm {
	name: string;
	email: string;
	password: string;
	phone_number: string;
	address: string;
	city_id: string;
	township_id: string;
}

export interface UserProfileForm {
	name: string;
	email: string;
	phone_number: string;
	address: string;
	township: string;
	city: string;
}
