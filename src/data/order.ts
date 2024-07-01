import Order from "../interfaces/IOrder.ts";
import orderDetails from "./orderDetail.ts";
import voucher from "./voucher.ts";
const [voucher_1, voucher_2] = voucher;

const [orderDetails_1,orderDetail_2 ] = orderDetails;

const orders: Order[] = [
    {
        id: 1,
        status: 'Đang xử lý',
        orderDate: '2024-06-04',
        orderDetail: [orderDetails_1],
        voucher: voucher_1,
       },
    {
        id: 2,
        status: 'Đã nhận được hàng',
        orderDate: '2024-06-02',
        orderDetail: [orderDetail_2],
        voucher: voucher_2,
    },
];

export {    orderDetails, orders };