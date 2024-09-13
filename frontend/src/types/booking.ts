export type Booking = {
	id: string;
	date: Date;
	description: string;
	amount: number;
	category: string;
	type: Type;
}

type Type = 'INCOME' | 'EXPENSE';

export type BookingForm = {
	date: Date;
	description: string;
	amount: number;
	category: string;
	type: Type;
}