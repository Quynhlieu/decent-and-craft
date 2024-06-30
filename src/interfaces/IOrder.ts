import OrderDetail from './IOrderDetail';
import Voucher from './IVoucher';
import {Product} from "./Product.ts";
export default interface Order{
    id: number;
    orderDetail: OrderDetail[];
    voucher?: Voucher;
    product: Product;
    quantity: number;
    status: string;
    orderDate: string;
}