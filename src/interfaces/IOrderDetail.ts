import {Product} from "./Product.ts";

export default interface OrderDetail {
    product: Product;
    quantity: number;
    price: number;
}