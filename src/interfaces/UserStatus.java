import Address from "./IAddress.ts";
import Order from "./IOrder.ts";
enum UserStatus {
    HOAT_DONG,
    BI_KHOA
}

export default interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    status: UserStatus;
    address?: Address[];
    order?: Order[];
    review?: Review[];
}
