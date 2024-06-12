import Address from "./IAddess.ts";
import Order from "./IOrder.ts";

export default interface IUser{
    id: number;
    fullName: string;
    email: string;
    password:string;
    phone?: string;
    sex?: string;
    address?: Address[];
    order?: Order[];
}