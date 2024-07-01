import OrderDetail from './IOrderDetail';
import Voucher from './IVoucher';
export default interface Order{
    id: number;
    orderDetail: OrderDetail[];
    voucher?: Voucher;
    status: string;
    orderDate: string;
}