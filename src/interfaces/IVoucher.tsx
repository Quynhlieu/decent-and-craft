import {IOrder} from "./IOrder.ts";

export interface IVoucher {
    id: number;
    voucherCode: string;
    description: string;
    quantity: number;
    amount: number;
    conditions: number;
    expirationDate: string;
    orders: IOrder[];
}