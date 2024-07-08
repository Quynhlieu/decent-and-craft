import IOrder from "./IOrder";
import IUser from "./IUser.ts";


export default interface Address{
    id: number;
    province: string;
    district: string;
    ward: string;
    description: string;
    isDefaultAddress: boolean;
    fullName: string;
    phoneNumber: string;
    user: IUser;
    orders: IOrder[];
}