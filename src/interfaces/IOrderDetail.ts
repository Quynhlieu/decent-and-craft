import {Product} from "./Product.ts";

export default interface OrderDetail {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}