import OrderDetail from "../interfaces/IOrderDetail.ts";

const orderDetails: OrderDetail[] = [
    {
        product: {
            id: 1,
            name: "Set Qua Protrail 113",
            price: 950000,
            thumb: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg"
        },
        quantity: 3,
        price: 950000,
    },
    {
        product: {
            id: 2,
            name: "Set Qua Protrail Sieu cap vip pro",
            price: 555555,
            thumb: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg"
        },
        price: 555555,
        quantity: 1
    },
];
export default orderDetails;