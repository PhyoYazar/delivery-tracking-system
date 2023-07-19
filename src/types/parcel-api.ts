export interface ParcelResponse {
	id: 'string';
	created_at: 'string';
	updatedAt: 'string';
	price: number;
	picked_up: boolean;
	arrived_warehouse: boolean;
	finish: boolean;
	sender_id: 'string';
	receiver_id: 'string';
	user_id: 'string' | null;
	location_id: 'string' | null;
}
