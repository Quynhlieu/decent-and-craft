import IAddress from "./IAddress";
import IUser from "./IUser.ts";
import {IVoucher} from "./IVoucher.tsx";

export enum OrderStatus {
    CHO_THANH_TOAN,
    DANG_VAN_CHUYEN,
    HOAN_THANH,
    TRA_HANG,
    HOAN_TIEN,
    DA_HUY
}

export default interface IOrder {
    id: number;
    address: IAddress;
    status: OrderStatus;
    voucher: IVoucher;
    user: IUser;
    notice: string;
    shippingFee: number;
    totalPrice: number;
}