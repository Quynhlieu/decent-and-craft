import OrderDetail from './IOrderDetail';
import Voucher from './IVoucher';
import User from "./IUser.ts";
import Address from "./IAddess.ts";
export default interface Order{
    id: number;
    user: User;
    paymentMethod: string;
    shippingFee: number;
    address: Address;
    orderDetail: OrderDetail[];
    voucher?: Voucher;
    status: string;
    orderDate: string;
}