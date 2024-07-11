import Order from "../interfaces/IOrder.ts";
import orderDetails from "./orderDetail.ts";
import voucher from "./voucher.ts";
import {address} from "./address.ts";
import users from "./user.ts";
const [voucher_1, voucher_2] = voucher;
const [address_1,address_4 ] = address;
const [orderDetails_1,orderDetail_2 ] = orderDetails;
const [user_1, user_2] = users;
const orders: Order[] = [
    {
        id: 1,
        user: user_1,
        paymentMethod: "Credit Card",
        shippingFee: 15,
        address: address_1,
        voucher: voucher_1,
        status: 'Đơn hàng đã được đặt',
        orderDate: '2024-06-04',
        orderDetail: [orderDetails_1, orderDetail_2],
    },
    {
        id: 2,
        user: user_2,
        paymentMethod: "PayPal",
        shippingFee: 10,
        address: address_4,
        voucher: voucher_2,
        status: 'Đã nhận được hàng',
        orderDate: '2024-06-02',
        orderDetail: [orderDetail_2],
    },
];

export {    orderDetails, orders };