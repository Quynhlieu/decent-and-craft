import {Product} from "./Product.ts";

export default interface Image {
    id: number;
    product: Product,
    path: string
}