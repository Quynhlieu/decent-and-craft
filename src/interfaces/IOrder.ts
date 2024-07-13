
import Voucher from "./IVoucher.ts";
import Address from "./IAddress";
import OrderDetail from "./IOrderDetail.ts";
import IUser from "./IUser.ts";

export enum OrderStatus {
    CHO_VAN_CHUYEN = 'CHO_VAN_CHUYEN',
    DANG_VAN_CHUYEN = 'DANG_VAN_CHUYEN',
    HOAN_THANH = 'HOAN_THANH',
    DA_HUY = 'DA_HUY',
    TRA_HANG = 'TRA_HANG',
    HOAN_TIEN = 'HOAN_TIEN',
}

export default interface IOrder {
    id: number;
    address: Address;
    status: OrderStatus;
    voucher?: Voucher;
    user: IUser;
    orderDetails: OrderDetail[];
    shipment: string;
    notice: string;
    shippingFee: number;
    totalPrice: number;
    createdDate: string;
}