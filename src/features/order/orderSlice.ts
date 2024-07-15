import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import OrderDetail from "../../interfaces/IOrderDetail";
export interface OrderAddDto {
    "voucherId": number | null;
    "addressId": number | null;
    "notice": string;
    "shipment": "COD",
    "shippingFee": number;
    "userId": number | null;
    "orderDetails": OrderDetailDto[]
}
export interface OrderDetailDto {

    productId: number;
    price: number;
    quantity: number;
}
const initialState: OrderAddDto = {
    voucherId: null,
    addressId: null,
    notice: "",
    shipment: "COD",
    shippingFee: 20000,
    userId: null,
    orderDetails: []
};
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderSetUserId(state, action: PayloadAction<number>) {
            state.userId = action.payload
        },
        orderSetAddressId(state, action: PayloadAction<number>) {
            state.addressId = action.payload
        },
        orderSetVoucherId(state, action: PayloadAction<number>) {
            state.voucherId = action.payload
        },
        orderSetNotice(state, action: PayloadAction<string>) {
            state.notice = action.payload
        },
        orderSetOrderDetails(state, action: PayloadAction<OrderDetailDto[]>) {
            state.orderDetails = action.payload
        }
    }
})
export default orderSlice.reducer
export const {
    orderSetAddressId,
    orderSetVoucherId,
    orderSetUserId,
    orderSetNotice,
    orderSetOrderDetails
} = orderSlice.actions;
export const getTotalPrice = (orderDetails: OrderDetailDto[]) => {
    return orderDetails.reduce((total, orderDetail) => total + (orderDetail.price * orderDetail.quantity), 0);

}