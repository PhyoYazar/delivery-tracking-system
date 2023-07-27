import type { City, Township } from './address';

export interface Sender {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
	phone_number: string;
	address: string;
	township_id: string;
	township: Township;
	city_id: string;
	city: City;
}
