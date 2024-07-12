import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface OrderAddDto {
    "voucherId": number | null;
    "addressId": number | null;
    "notice": string;
    "shipment": "COD",
    "shippingFee": number;
    "userId": number | null;
}
const initialState: OrderAddDto = {
    voucherId: null,
    addressId: null,
    notice: "",
    shipment: "COD",
    shippingFee: 20000,
    userId: null,

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
    }

})
export default orderSlice.reducer
export const { orderSetAddressId, orderSetVoucherId, orderSetUserId } = orderSlice.actions;