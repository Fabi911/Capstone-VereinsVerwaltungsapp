export type Member = {
    memberId: string;
    lastName: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: Address;
    birthday: Date;

}

type Address = {
    street: string;
    zip: string;
    city: string;
}