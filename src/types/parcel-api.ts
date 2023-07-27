import type { Receiver } from './receiver';
import type { Sender } from './sender';

export interface ParcelResponse {
	id: string;
	created_at: string;
	updatedAt: string;
	price: number;
	picked_up: boolean;
	arrived_warehouse: boolean;
	finish: boolean;
	deliver: boolean;
	sender_id: string;
	sender: Sender;
	receiver_id: string;
	receiver: Receiver;
	user_id: string | null;
	location_id: string | null;
}
