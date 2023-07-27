export interface City {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
}

export interface Township {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
	city_id: string;
	city: City;
}
